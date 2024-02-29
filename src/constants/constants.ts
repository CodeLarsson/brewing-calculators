const constants = {
  honey: {
    sugarPerKilo: 0.8, // Fraction of sugar in honey by weight
    waterPerKilo: 0.2, // Fraction of water in honey by weight
    densityPerKilo: 1420,
    literInKilo: 0.714,
  },
  alcohol: {
    conversionFactor: 131.25, // conversion factor from SG to ABV
    sugarPerLiterFor1PctABV: 17.0, // grams of sugar per liter to create 1% ABV
    specificGravity: 0.794, //the specific gravity of pure ethanol. This part of the formula adjusts the calculation to reflect the volume of alcohol in the solution, taking into account the density of ethanol compared to water
  },
  gravity: {
    sugarPerGravityPoint: 2.6462, // Grams of sugar per liter to raise gravity with 1 point
    scaling: 76.08, //This is a scaling factor that helps convert the difference between OG and FG into an alcohol percentage. It's derived from the empirical data on the fermentation process and the specific gravity of ethanol
    adjustment: 1.775, //provides an adjustment based on the original gravity. The value 1.775 is used to normalize the scale of gravity values, adjusting the calculation for brews with varying starting gravities.
  },
  water: { sg: 1.0, liter: { kilo: 1.0 } },
  weight: {
    grams: {
      metric: {
        kilo: 1000,
      },
      imperialConversion: {
        pound: 453.59237, //LBS
        ounce: 0.035274, //OZ
      },
    },
  },
  volume: {
    liters: {
      metric: {
        deciliter: 10,
        centiliter: 100,
        milliliter: 1000,
      },
      imperialCustomaryConversion: {
        fluidOunce: 0.0284131, // fl.Oz
        pint: 0.568261, //pt
        quart: 1.13652, //qt
        gallon: 4.54609, //gal
      },
      usCustomaryConversion: {
        fluidOunce: 0.0295735, // fl.Oz
        pint: 0.473176, //pt
        quart: 0.946353, //qt
        gallon: 3.78541, //gal
      },
    },
  },
};

export { constants };
