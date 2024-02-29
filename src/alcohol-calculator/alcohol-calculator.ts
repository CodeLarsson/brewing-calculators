import { constants } from '../constants/constants';
import { Helpers } from '../helpers/helpers';
import { AlcoholConversionFormula } from './alcohol-calculator.types';

export class AlcoholCalculator {
  /**
   *
   * @param og: number
   * @param fg: number
   * @returns number
   * Standard ABV Formula: The simple ABV formula, (OG−FG)×131.25, is a straightforward calculation that provides a rough estimate of alcohol content. It works well for many brewing scenarios but can be less accurate for high-gravity brews or those with significant non-fermentable sugar content.
   */
  public static CalculateABV(og: number, fg: number): number {
    if (fg > og) {
      throw new Error('fg cannot be greater than og');
    }

    if (fg === 0) {
      throw new Error('fg cannot be 0, must be 1.0 or 0.9');
    }

    return Helpers.FixedPrecision((og - fg) * constants.alcohol.conversionFactor);
  }

  /**
   *
   * @param og
   * @param fg
   * @returns
   * This enhanced formula is suitable for brewers seeking more precise ABV estimations, especially when working with brews outside the typical range of alcohol content. It's a valuable tool for ensuring consistency and accuracy in alcohol labeling or when aiming to achieve specific characteristics in the final product.
   */
  public static CalculateAbvEnhanced(og: number, fg: number): number {
    if (fg > og) {
      throw new Error('fg cannot be greater than og');
    }

    if (fg === 0) {
      throw new Error('fg cannot be 0, must be 1.0 or 0.9');
    }

    return Helpers.FixedPrecision(((1.05 * (og - fg)) / fg) * (100 / constants.alcohol.specificGravity));
  }

  /**
   *
   * @param og
   * @param fg
   * @returns number Estimated ABV%
   * ((76.08 * (OG−FG)) / (1.775 − OG)) * (FG / 0.794)
   * High-Gravity Beers: For beers starting at an OG of 1.080 or higher, the alcohol yield from fermentation can be less predictable due to the stress high sugar and alcohol levels place on yeast. The alternate formula can provide a more accurate estimation of alcohol by volume by adjusting for these factors.
   * High-Gravity Meads: Meads with an OG of 1.120 or higher often aim for substantial alcohol content and may retain significant sweetness. The alternate formula helps to better estimate the ABV by considering the efficiency of sugar conversion in such a rich fermentable environment.
   * The formula takes into account the impact of high original gravity on fermentation dynamics, offering a more nuanced view of alcohol production. This is especially useful for brewers and mead makers aiming for precision in their final product's alcohol content.
   */
  public static CalculateAlternateABV(og: number, fg: number): number {
    if (fg > og) {
      throw new Error('fg cannot be greater than og');
    }

    if (fg === 0) {
      throw new Error('fg cannot be 0, must be 1.0 or 0.9');
    }

    const calculated =
      ((constants.gravity.scaling * (og - fg)) / (constants.gravity.adjustment - og)) *
      (fg / constants.alcohol.specificGravity);

    return Helpers.FixedPrecision(calculated);
  }

  public static CalculateAlocholByVolume(
    og: number,
    fg: number,
    formula: AlcoholConversionFormula = 'STANDARD',
  ): number {
    if (formula === 'ALTERNATE') {
      return AlcoholCalculator.CalculateAlternateABV(og, fg);
    } else if (formula === 'ENHANCED') {
      return AlcoholCalculator.CalculateAbvEnhanced(og, fg);
    }
    return AlcoholCalculator.CalculateABV(og, fg);
  }
}
