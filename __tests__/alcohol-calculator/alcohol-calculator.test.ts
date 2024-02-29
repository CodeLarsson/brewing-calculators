import { describe, expect, it } from '@jest/globals';
import { AlcoholCalculator } from '../../src/alcohol-calculator/alcohol-calculator';

describe('alcohol-calculator', () => {
  describe('calculateABV', () => {
    const sut = AlcoholCalculator.CalculateABV;

    it('should return 0.0', () => {
      //Arrange
      const expected = 0.0;

      // Act
      const actual = sut(1.0, 1.0);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should return 14.437', () => {
      // Arrange
      const expected = 14.437;

      // Act
      const actual = sut(1.15, 1.04);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should throw error when fg is 0', () => {
      // Arrange
      const expected = 'fg cannot be 0, must be 1.0 or 0.9';

      // Act
      const actual = () => sut(1.15, 0);

      // Assert
      expect(actual).toThrowError(expected);
    });

    it('should throw error when fg is greater than og', () => {
      // Arrange
      const expected = 'fg cannot be greater than og';

      // Act
      const actual = () => sut(1.15, 1.16);

      // Assert
      expect(actual).toThrowError(expected);
    });
  });

  describe('calculateAbvEnhanced', () => {
    const sut = AlcoholCalculator.CalculateAbvEnhanced;

    it('should return 0.0', () => {
      // Arrange
      const expected = 0.0;

      // Act
      const actual = sut(1.0, 1.0);
      // Assert
      expect(actual).toBe(expected);
    });

    it('should return 13.987', () => {
      // Arrange
      const expected = 13.987;

      //Act
      const actual = sut(1.15, 1.04);
      //Assert
      expect(actual).toBe(expected);
    });

    it('should throw error when fg is 0', () => {
      // Arrange
      const expected = 'fg cannot be 0, must be 1.0 or 0.9';

      // Act
      const actual = () => sut(1.15, 0);

      // Assert
      expect(actual).toThrowError(expected);
    });

    it('should throw error when fg is greater than og', () => {
      // Arrange
      const expected = 'fg cannot be greater than og';

      // Act
      const actual = () => sut(1.15, 1.16);

      // Assert
      expect(actual).toThrowError(expected);
    });
  });

  describe('calculateAlternateABV', () => {
    const sut = AlcoholCalculator.CalculateAlternateABV;

    it('should return 0.0', () => {
      // Arrange
      const expected = 0.0;

      // Act
      const actual = sut(1.0, 1.0);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should return 17.539', () => {
      // Arrange
      const expected = 17.539;

      // Act
      const actual = sut(1.15, 1.04);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should throw error when fg is 0', () => {
      // Arrange
      const expected = 'fg cannot be 0, must be 1.0 or 0.9';

      // Act
      const actual = () => sut(1.15, 0);

      // Assert
      expect(actual).toThrowError(expected);
    });

    it('should throw error when fg is greater than og', () => {
      // Arrange
      const expected = 'fg cannot be greater than og';

      // Act
      const actual = () => sut(1.15, 1.16);

      // Assert
      expect(actual).toThrowError(expected);
    });
  });
});
