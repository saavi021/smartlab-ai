function generateExplanation(report) {
    return report.map((item) => {
      let explanation = "";
  
      switch (item.name) {
        case "Hemoglobin":
          explanation =
            "Your hemoglobin value is within the reference range shown in this report. Hemoglobin helps carry oxygen through the body.";
          break;
  
        case "White Blood Cell Count":
          explanation =
            "Your white blood cell count is within the reference range shown in this report. White blood cells are part of the immune system.";
          break;
  
        case "Platelet Count":
          explanation =
            "Your platelet count is within the reference range shown in this report. Platelets help with normal blood clotting.";
          break;
  
        case "Glucose (Fasting)":
          explanation =
            "Your fasting glucose value is within the reference range shown in this report.";
          break;
  
        case "Total Cholesterol":
          explanation =
            "Your total cholesterol value is below the reference limit shown in this report.";
          break;
  
        case "Vitamin D":
          explanation =
            "Your Vitamin D value is within the reference range shown in this report. Vitamin D is important for bone health and other body functions.";
          break;
  
        default:
          explanation =
            "An explanation is not available for this test yet.";
      }
  
      return {
        ...item,
        explanation,
      };
    });
  }
  
  module.exports = generateExplanation;