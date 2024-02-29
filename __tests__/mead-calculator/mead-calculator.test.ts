import { describe, expect, it } from '@jest/globals';
import { MeadCalculator } from '../../src/mead-calculator/mead-calculator';

describe('MeadCalculator', () => {
  describe('CalculateSugarsPerLiter', () => {
    const sut = MeadCalculator.CalculateSugarsPerLiter;
    it('should return 40', () => {
      // Arrange
      const expected = 40;

      // Act
      const actual = sut(0, 5, 200);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should return 160', () => {
      // Arrange
      const expected = 160;

      // Act
      const actual = sut(1000, 5, 0);

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('CalculateHoneyLiters', () => {
    const sut = MeadCalculator.CalculateHoneyLiters;
    it('should return 0.714', () => {
      // Arrange
      const expected = 0.714;

      // Act
      const actual = sut(1000);

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('CalculateWaterNeededForBatchSize', () => {
    const sut = MeadCalculator.CalculateWaterNeededForBatchSize;
    it('should return 4.286', () => {
      // Arrange
      const expected = 4.286;

      // Act
      const actual = sut(5, 1000);

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('CalculateHoneySugarContentsInKilo', () => {
    const sut = MeadCalculator.CalculateHoneySugarContentsInKilo;
    it('should return 0.8', () => {
      // Arrange
      const expected = 0.8;

      // Act
      const actual = sut(1000);

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('CalculateHoneyNonSugarsInLiter', () => {
    const sut = MeadCalculator.CalculateHoneyNonSugarsInLiter;
    it('should return 0.2', () => {
      // Arrange
      const expected = 0.2;

      // Act
      const actual = sut(1000);

      // Assert
      expect(actual).toBe(expected);
    });
  });
});
