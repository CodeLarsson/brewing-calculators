import { AlcoholCalculator } from '../alcohol-calculator/alcohol-calculator';
import { AlcoholConversionFormula } from '../alcohol-calculator/alcohol-calculator.types';
import { constants } from '../constants/constants';

export class Helpers {
  public static FixedPrecision = (number: number, decimalPoints = 3): number => {
    if (isNaN(number) || typeof number !== 'number') {
      throw new Error('number is not a number');
    }

    return Number(number.toFixed(decimalPoints));
  };

  public static CalculateSpecificGravity = (gramsSugarPerLiter: number): number => {
    const sg = gramsSugarPerLiter / constants.gravity.sugarPerGravityPoint;
    const calculated = sg / 1000 + constants.water.sg;
    return Helpers.FixedPrecision(calculated);
  };

  public static CalculateSpecificGravityWithWater = (gramsSugar: number, volume: number): number => {
    const gramsSugarPerLiter = gramsSugar / volume;
    const calculated = Helpers.CalculateSpecificGravity(gramsSugarPerLiter);
    return Helpers.FixedPrecision(calculated);
  };

  public static CalculatePotentialAbv = (gramsSugarPerLiter: number) => {
    const calculated = gramsSugarPerLiter / constants.alcohol.sugarPerLiterFor1PctABV;
    return Helpers.FixedPrecision(calculated);
  };

  public static CalculatePotentialAbvWithWater = (gramsSugar: number, volume: number) => {
    const gramsSugarPerLiter = gramsSugar / volume;
    const calculated = Helpers.CalculatePotentialAbv(gramsSugarPerLiter);
    return Helpers.FixedPrecision(calculated);
  };

  public static CalculatePotentialResidualSugar = (
    gramsOfSugarPerLiter: number,
    yeastAlcoholTolerance: number,
    allowNegativeResiduals = false,
  ) => {
    const potentialAbvByHundred = Helpers.CalculatePotentialAbv(gramsOfSugarPerLiter) / 100;

    const yeastPotentialAbvByHundred = yeastAlcoholTolerance / 100;

    let abvDifference;
    if (allowNegativeResiduals) {
      abvDifference = potentialAbvByHundred - yeastPotentialAbvByHundred;
    } else {
      abvDifference = Math.max(0, potentialAbvByHundred - yeastPotentialAbvByHundred);
    }

    const calculated = gramsOfSugarPerLiter * abvDifference;

    return Helpers.FixedPrecision(calculated);
  };

  public static CalculateFinalGravity = (gramsOfSugarPerLiter: number, yeastAlcoholTolerance: number) => {
    const potentialFinalGravity =
      Helpers.CalculatePotentialResidualSugar(gramsOfSugarPerLiter, yeastAlcoholTolerance, true) /
      constants.gravity.sugarPerGravityPoint;

    const calculated = potentialFinalGravity / 1000 + 1;
    return Helpers.FixedPrecision(calculated);
  };

  public static CalculateFinalAbv = (
    gramsOfSugarPerLiter: number,
    yeastAlcoholTolerance: number,
    formula: AlcoholConversionFormula = 'STANDARD',
  ) => {
    const specificGravity = Helpers.CalculateSpecificGravity(gramsOfSugarPerLiter);

    const finalSpecificGravity = Helpers.CalculateFinalGravity(gramsOfSugarPerLiter, yeastAlcoholTolerance);
    const calculated = AlcoholCalculator.CalculateAlocholByVolume(specificGravity, finalSpecificGravity, formula);
    return Helpers.FixedPrecision(calculated);
  };
}
