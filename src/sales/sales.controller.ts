import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('/record')
  importSalesReport() {
    return this.salesService.importSalesReport();
  }

  @Get('/report')
  getAllSalesReports() {
    return this.salesService.getAllSalesReports();
  }

  @Get('/report/startDate/:startDate/endDate/:endDate')
  getSalesReportByDate(@Param('startDate') startDate: string, @Param('endDate') endDate: string) {
    return this.salesService.getSalesReportByDate(startDate, endDate);
  }
}
