import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Sale, SaleDocument } from 'src/schemas/sale.schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as path from 'path';
import * as csv from 'csvtojson';
import * as moment from 'moment';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sale.name) private saleModel: Model<SaleDocument>) {}

  async importSalesReport() {
    try {
      const fileName = 'sales_test.csv'
      const filePath = path.resolve(__dirname, `../../${fileName}`);

      csv()
        .fromFile(filePath)
        .then((data) => {
          for (let d of data) {
            let sale = new this.saleModel({
              userName: d.USER_NAME,
              age: d.AGE,
              height: d.HEIGHT,
              gender: d.GENDER,
              sales: d.SALES,
              lastPurchaseDate: moment(d.LAST_PURCHASE_DATE).format('YYYY-MM-DD')
            });

            sale.save();
          }
        });

      return ({message: `CSV file '${fileName}' successfully imported.`});
    } catch(e) {
      console.log(e);
    }
  }

  async getAllSalesReports() {
    return this.saleModel.find();
  }

  async getSalesReportByDate(startDate: string, endDate: string) {
    return this.saleModel.find({
      lastPurchaseDate: {
        $gte: moment(startDate).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
        $lte: moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
      }
    });
  }
}
