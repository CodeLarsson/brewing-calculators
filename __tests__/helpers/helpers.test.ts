import { describe, expect, it } from '@jest/globals';
import { Helpers } from '../../src/helpers/helpers';

describe('Helpers', () => {
  describe('fixedPrecision', () => {
    const sut = Helpers.FixedPrecision;
    it('should return 0', () => {
      // Arrange
      const expected = 0;

      // Act
      const actual = sut(0);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should return 1.5', () => {
      // Arrange
      const expected = 1.5;

      // Act
      const actual = sut(1.49, 1);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should return 1.150', () => {
      // Arrange
      const expected = 1.15;

      // Act
      const actual = sut(1.1499);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should throw error when number is not a number', () => {
      // Arrange
      const expected = 'number is not a number';

      // Act
      const actual = () => sut('a' as unknown as number);

      // Assert
      expect(actual).toThrowError(expected);
    });
  });

  describe('calculateSpecificGravity', () => {
    const sut = Helpers.CalculateSpecificGravity;
    it('should return 1.038', () => {
      // Arrange
      const expected = 1.038;

      // Act
      const actual = sut(100); // 100g sugar / L of water = SG 1.038

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('calculateSpecificGravityWithWater', () => {
    const sut = Helpers.CalculateSpecificGravityWithWater;
    it('should return 1.038', () => {
      // Arrange
      const expected = 1.038;

      // Act
      const actual = sut(100, 1); // 100g sugar / L of water = SG 1.038

      // Assert
      expect(actual).toBe(expected);
    });

    it('should return 1.019', () => {
      // Arrange
      const expected = 1.019;

      // Act
      const actual = sut(100, 2); // 100g sugar / L of water = SG 1.038)

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('calculatePotentialAbv', () => {
    const sut = Helpers.CalculatePotentialAbv;
    it('should return 5.882', () => {
      // Arrange
      const expected = 5.882;

      // Act
      const actual = sut(100); // 100g sugar / L of water = SG 1.038 / 17.0 = 5.882

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('calculatePotentialAbvWithWater', () => {
    const sut = Helpers.CalculatePotentialAbvWithWater;
    it('should return 2.941', () => {
      // Arrange
      const expected = 2.941;

      // Act
      const actual = sut(50, 1); // 50g sugar /L of water = SG 1.019 / 17.0 = 2.941

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('calculatePotentialResidualSugar', () => {
    const sut = Helpers.CalculatePotentialResidualSugar;
    it('should return 30.116', () => {
      // Arrange
      const expected = 30.116;

      // Act
      const actual = sut(400, 16);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should return 0', () => {
      // Arrange
      const expected = 0;

      // Act
      const actual = sut(100, 16);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should return -10.118', () => {
      // Arrange
      const expected = -10.118;

      // Act
      const actual = sut(100, 16, true);

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('calculateFinalGravity', () => {
    const sut = Helpers.CalculateFinalGravity;
    it('should return 1.011', () => {
      // Arrange
      const expected = 1.011;

      // Act
      const actual = sut(400, 16);

      // Assert
      expect(actual).toBe(expected);
    });

    it('should return 0.997', () => {
      // Arrange
      const expected = 0.997;

      // Act
      const actual = sut(200, 16);

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe('calculateFinalAbv', () => {
    const sut = Helpers.CalculateFinalAbv;
    it('Formula STANDARD should return 5.513', () => {
      // Arrange
      const expected = 5.513;

      // Act
      const actual = sut(100, 16);

      // Assert
      expect(actual).toBe(expected);
    });

    it('Formula ENHANCED should return 5.576', () => {
      // Arrange
      const expected = 5.576;

      // Act
      const actual = sut(100, 16, 'ENHANCED');

      // Assert
      expect(actual).toBe(expected);
    });

    it('Formula ALTERNATE should return 5.439', () => {
      // Arrange
      const expected = 5.439;

      // Act
      const actual = sut(100, 16, 'ALTERNATE');

      // Assert
      expect(actual).toBe(expected);
    });
  });
});
