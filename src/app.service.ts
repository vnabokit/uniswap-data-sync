import * as https from 'https';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import axios, { AxiosResponse } from 'axios';
import { Pairs } from './entities/pairs.entity';
import { Pair } from './dto/pair.dto';
import { config } from './config/dev.config';

const MAX_SKIP = 5000; // Limitation from the Uniswap
const first = 1000;
const query = `query getAllPairs($skip: Int!){
        pairs(first: ${first}, skip: $skip) {
            id
            token0 {
                id
            }
            token1 {
                id
            }
        }
    }`;

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Pairs)
    private uniswapAllPairsRepository: Repository<Pairs>,
  ) {}

  @Cron('0 */30 * * * *')
  async fetchData() {
    if (MAX_SKIP % first > 0) {
      throw new Error('MAX_SKIP must be aliquot to chunkLength');
    }
    const skipList = Array.from(
      { length: MAX_SKIP / first + 1 },
      (el, i) => i * first,
    );
    let response: AxiosResponse;
    for await (let skip of skipList) {
      let chunkNumber = skip / first + 1;
      this._log(
        `Sending request for retrieveing chunk #${chunkNumber}: first=${first}, skip=${skip}...`,
      );
      try {
        response = await axios.request({
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
          url: config.graphqlBaseUrl,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: { query, variables: { skip } },
        });
        this._log('Data is retrieved.');
      } catch (err) {
        throw new Error('Error while retrieving data from server.');
      }
      this.saveData(
        <Pair[]>response.data.data.pairs.map((pairResponse) => {
          return {
            pair: pairResponse.id,
            token0: pairResponse.token0.id,
            token1: pairResponse.token1.id,
          };
        }),
        chunkNumber,
      )
        .then((chunkNumber) =>
          this._log(`Data is saved for chunk #${chunkNumber}.`),
        )
        .catch((err) =>
          this._log(`There is some issue while saving data for a chunk.`, err),
        );
    }
    this._log('Finish retrieving data from server.');
  }

  async saveData(uniswapPairs: Pair[], chunkNumber: number): Promise<number> {
    let result = await this.uniswapAllPairsRepository.upsert(
      this.uniswapAllPairsRepository.create(uniswapPairs),
      ['pair'],
    );
    return chunkNumber;
  }

  private _log(...args) {
    console.log(new Date().toISOString(), ...arguments);
  }
}
