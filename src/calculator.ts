import { Helpers } from './helpers/helpers';
import { MeadCalculator } from './mead-calculator/mead-calculator';

export class Calculator {
  public batchSize: number = 0;
  public honeyAmmount: number = 0;
  public yeastPotential: number = 16;
  public additionalSugars: number = 0;

  setAdditionalSugars(additionalSugars: number) {
    this.additionalSugars = additionalSugars;
  }

  setYeastPotential(yeastPotential: number) {
    this.yeastPotential = yeastPotential;
  }

  public setBatchSize(batchSize: number) {
    this.batchSize = batchSize;
  }

  public setHoneyAmmount(honeyAmmount: number) {
    this.honeyAmmount = honeyAmmount;
  }

  public getSugarsPerLiter(): number {
    return MeadCalculator.CalculateSugarsPerLiter(this.honeyAmmount * 1000, this.batchSize, this.additionalSugars);
  }

  public getHoneyInGrams(): number {
    return this.honeyAmmount * 1000;
  }

  public printTable(): string {
    let returnString = '';

    const data: TableData[] = [
      { Property: 'Batch size', Value: this.batchSize },
      { Property: 'Honey ammount', Value: this.honeyAmmount },
      { Property: 'Honey in liter', Value: MeadCalculator.CalculateHoneyLiters(this.getHoneyInGrams()) },
      {
        Property: 'Water needed for batch',
        Value: MeadCalculator.CalculateWaterNeededForBatchSize(this.batchSize, this.getHoneyInGrams()),
      },
      {
        Property: 'Estimated sugars must',
        Value: MeadCalculator.CalculateSugarsPerLiter(this.getHoneyInGrams(), this.batchSize),
      },
      { Property: 'Estimated original gravity', Value: Helpers.CalculateSpecificGravity(this.getSugarsPerLiter()) },
      {
        Property: 'Estimated final gravity',
        Value: Helpers.CalculateFinalGravity(this.getSugarsPerLiter(), this.yeastPotential),
      },
      {
        Property: 'Estimated residual sugar',
        Value: Helpers.CalculatePotentialResidualSugar(this.getSugarsPerLiter(), this.yeastPotential),
      },
      { Property: 'Estimated potential ABV%', Value: Helpers.CalculatePotentialAbv(this.getSugarsPerLiter()) },
      {
        Property: 'Estimated final ABV%',
        Value: Helpers.CalculateFinalAbv(this.getSugarsPerLiter(), this.yeastPotential),
      },
    ];

    // Extract headers
    const headers = Object.keys(data[0]!);

    // Calculate maximum column widths
    const columnWidths = headers.map((header) =>
      Math.max(header.length, ...data.map((row) => row[header]?.toString().length || 0)),
    );

    // Create a header row
    const headerRow = headers.map((header, i) => header.padEnd(columnWidths[i] || 0, ' ')).join(' | ');
    returnString += headerRow + '\n';
    returnString += columnWidths.map((width) => '-'.repeat(width)).join('-+-');
    returnString += '\n';

    // Print each row
    data.forEach((row) => {
      const rowString = headers
        .map((header, i) => (row[header]?.toString() || '').padEnd(columnWidths[i], ' '))
        .join(' | ');
      returnString += rowString + '\n';
    });

    return returnString;
  }
}

type TableData = {
  [key: string]: any;
};
