import { constants } from '../constants/constants';
import { Helpers } from '../helpers/helpers';

export class MeadCalculator {
  public static CalculateSugarsPerLiter(
    gramsHoney: number,
    batchSizeLiter: number,
    additionalGramsOfSugars = 0,
  ): number {
    const calculated = (gramsHoney * constants.honey.sugarPerKilo + additionalGramsOfSugars) / batchSizeLiter;
    return Helpers.FixedPrecision(calculated);
  }

  public static CalculateHoneyLiters(gramsHoney: number): number {
    const calculated = (gramsHoney / constants.weight.grams.metric.kilo) * constants.honey.literInKilo;
    return Helpers.FixedPrecision(calculated);
  }

  public static CalculateWaterNeededForBatchSize(batchSizeLiter: number, gramsHoney: number): number {
    const calculated = batchSizeLiter - MeadCalculator.CalculateHoneyLiters(gramsHoney);
    return Helpers.FixedPrecision(calculated);
  }

  public static CalculateHoneySugarContentsInKilo(gramsHoney: number): number {
    const calculated = (gramsHoney / constants.weight.grams.metric.kilo) * constants.honey.sugarPerKilo;
    return Helpers.FixedPrecision(calculated);
  }

  public static CalculateHoneyNonSugarsInLiter(gramsHoney: number): number {
    const calculated = (gramsHoney / constants.weight.grams.metric.kilo) * constants.honey.waterPerKilo;
    return Helpers.FixedPrecision(calculated);
  }
}
