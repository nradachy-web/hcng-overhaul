/**
 * Where each answer lands on Dr. Christine's own form. Generated 2026-09-22
 * from public/assets/forms/hcng-new-patient-form.pdf (her Google Doc exported
 * to PDF) by reading the underscore blanks, checkbox glyphs, and bullets with
 * their coordinates. y is PDF space (from the bottom of a 612 x 792 page).
 * If the template is re-exported, regenerate this file; do not hand-edit.
 */

export type Spot = { p: number; x: number; y: number; w?: number };
export type Ring = { p: number; cx: number; cy: number; rx: number; ry: number };
export type Multi = { lines: Spot[] };
export type Target = Spot | Multi | Record<string, Spot | Ring>;

export const LAYOUT: Record<string, Target> = {
 "name": {
  "p": 1,
  "x": 66.2,
  "y": 522.2,
  "w": 201.0
 },
 "ssn": {
  "p": 1,
  "x": 344.3,
  "y": 522.2,
  "w": 96.4
 },
 "date": {
  "p": 1,
  "x": 468.9,
  "y": 522.2,
  "w": 101.6
 },
 "dob": {
  "p": 1,
  "x": 96.5,
  "y": 509.4,
  "w": 38.8
 },
 "age": {
  "p": 1,
  "x": 159.7,
  "y": 509.4,
  "w": 23.1
 },
 "height": {
  "p": 1,
  "x": 257.3,
  "y": 509.4,
  "w": 23.1
 },
 "weight": {
  "p": 1,
  "x": 319.1,
  "y": 509.4,
  "w": 28.4
 },
 "children": {
  "p": 1,
  "x": 517.0,
  "y": 509.4,
  "w": 54.5
 },
 "race": {
  "Asian": {
   "p": 1,
   "x": 79.0,
   "y": 498.2
  },
  "African American": {
   "p": 1,
   "x": 152.8,
   "y": 498.2
  },
  "Caucasian": {
   "p": 1,
   "x": 202.6,
   "y": 498.2
  },
  "Latin American": {
   "p": 1,
   "x": 272.8,
   "y": 498.2
  },
  "Native American": {
   "p": 1,
   "x": 348.7,
   "y": 498.2
  },
  "Pacific Islander": {
   "p": 1,
   "x": 418.7,
   "y": 498.2
  },
  "Other": {
   "p": 1,
   "x": 455.5,
   "y": 498.2
  }
 },
 "language": {
  "p": 1,
  "x": 506.6,
  "y": 498.4,
  "w": 64.2
 },
 "address": {
  "p": 1,
  "x": 74.9,
  "y": 485.6,
  "w": 295.1
 },
 "city": {
  "p": 1,
  "x": 394.4,
  "y": 485.6,
  "w": 96.4
 },
 "zip": {
  "p": 1,
  "x": 511.8,
  "y": 485.6,
  "w": 59.8
 },
 "cell": {
  "p": 1,
  "x": 86.0,
  "y": 472.8,
  "w": 133.0
 },
 "work_phone": {
  "p": 1,
  "x": 279.7,
  "y": 472.8,
  "w": 127.7
 },
 "home_phone": {
  "p": 1,
  "x": 470.9,
  "y": 472.8,
  "w": 101.6
 },
 "email": {
  "p": 1,
  "x": 64.2,
  "y": 459.9,
  "w": 509.5
 },
 "ref_patient": {
  "p": 1,
  "x": 157.0,
  "y": 447.1,
  "w": 169.6
 },
 "ref_physician": {
  "p": 1,
  "x": 405.5,
  "y": 447.1,
  "w": 164.3
 },
 "ref_ad": {
  "p": 1,
  "x": 130.6,
  "y": 434.3,
  "w": 190.5
 },
 "ref_other": {
  "p": 1,
  "x": 353.7,
  "y": 434.3,
  "w": 216.6
 },
 "work_injury": {
  "Yes": {
   "p": 1,
   "x": 384.1,
   "y": 421.3
  },
  "No": {
   "p": 1,
   "x": 408.9,
   "y": 421.3
  }
 },
 "accident_date": {
  "p": 1,
  "x": 496.6,
  "y": 421.5,
  "w": 70.2
 },
 "last_physical": {
  "p": 1,
  "x": 180.5,
  "y": 408.7,
  "w": 127.7
 },
 "pregnant": {
  "Yes": {
   "p": 1,
   "x": 451.7,
   "y": 408.5
  },
  "No": {
   "p": 1,
   "x": 505.4,
   "y": 408.5
  }
 },
 "operations": {
  "p": 1,
  "x": 171.3,
  "y": 395.9,
  "w": 394.4
 },
 "illnesses": {
  "p": 1,
  "x": 110.2,
  "y": 383.0,
  "w": 221.9
 },
 "fractures": {
  "p": 1,
  "x": 409.8,
  "y": 383.0,
  "w": 159.1
 },
 "prior_chiro": {
  "Yes": {
   "p": 1,
   "x": 246.5,
   "y": 370.0
  },
  "No": {
   "p": 1,
   "x": 292.3,
   "y": 370.0
  }
 },
 "prior_chiro_doctor": {
  "p": 1,
  "x": 384.2,
  "y": 370.2,
  "w": 185.3
 },
 "emergency_contact": {
  "p": 1,
  "x": 164.7,
  "y": 357.4,
  "w": 216.6
 },
 "emergency_phone": {
  "p": 1,
  "x": 416.8,
  "y": 357.4,
  "w": 153.9
 },
 "work_status": {
  "Employed": {
   "p": 1,
   "x": 149.9,
   "y": 344.4
  },
  "Retired": {
   "p": 1,
   "x": 217.1,
   "y": 344.4
  },
  "Disabled": {
   "p": 1,
   "x": 292.8,
   "y": 344.4
  },
  "Full-time student": {
   "p": 1,
   "x": 407.2,
   "y": 344.4
  },
  "Part-time student": {
   "p": 1,
   "x": 536.8,
   "y": 344.4
  }
 },
 "occupation": {
  "p": 1,
  "x": 89.6,
  "y": 331.8,
  "w": 195.7
 },
 "employer": {
  "p": 1,
  "x": 333.9,
  "y": 331.8,
  "w": 237.6
 },
 "employer_address": {
  "p": 1,
  "x": 117.7,
  "y": 318.9,
  "w": 206.2
 },
 "employer_city": {
  "p": 1,
  "x": 348.3,
  "y": 318.9,
  "w": 96.4
 },
 "employer_zip": {
  "p": 1,
  "x": 465.7,
  "y": 318.9,
  "w": 106.8
 },
 "policy_holder": {
  "p": 1,
  "x": 96.8,
  "y": 306.1,
  "w": 206.2
 },
 "policy_holder_dob": {
  "p": 1,
  "x": 402.6,
  "y": 306.1,
  "w": 169.6
 },
 "contract_no": {
  "p": 1,
  "x": 84.9,
  "y": 293.3,
  "w": 216.6
 },
 "group_no": {
  "p": 1,
  "x": 344.0,
  "y": 293.3,
  "w": 227.1
 },
 "insurance_company": {
  "p": 1,
  "x": 163.7,
  "y": 280.5,
  "w": 195.7
 },
 "insurance_phone": {
  "p": 1,
  "x": 392.4,
  "y": 280.5,
  "w": 180.0
 },
 "spouse": {
  "p": 1,
  "x": 146.3,
  "y": 267.7,
  "w": 216.6
 },
 "spouse_occupation": {
  "p": 1,
  "x": 419.9,
  "y": 267.7,
  "w": 153.9
 },
 "spouse_employer": {
  "p": 1,
  "x": 81.2,
  "y": 254.9,
  "w": 221.9
 },
 "spouse_employer_address": {
  "p": 1,
  "x": 345.4,
  "y": 254.9,
  "w": 227.1
 },
 "care_type": {
  "Relief Care": {
   "p": 1,
   "x": 92.6,
   "y": 126.5
  },
  "Corrective Care": {
   "p": 1,
   "x": 190.4,
   "y": 126.5
  },
  "Comprehensive Care": {
   "p": 1,
   "x": 313.9,
   "y": 126.5
  },
  "I would like to discuss my options with the doctor": {
   "p": 1,
   "x": 74.5,
   "y": 113.7
  }
 },
 "sex": {
  "M": {
   "p": 1,
   "cx": 210.4,
   "cy": 512.2,
   "rx": 7.5,
   "ry": 6.5
  },
  "F": {
   "p": 1,
   "cx": 219.6,
   "cy": 512.2,
   "rx": 5.4,
   "ry": 6.5
  }
 },
 "marital": {
  "Married": {
   "p": 1,
   "cx": 391.4,
   "cy": 512.2,
   "rx": 7.5,
   "ry": 6.5
  },
  "Single": {
   "p": 1,
   "cx": 400.7,
   "cy": 512.2,
   "rx": 5.4,
   "ry": 6.5
  },
  "Widowed": {
   "p": 1,
   "cx": 410.1,
   "cy": 512.2,
   "rx": 7.7,
   "ry": 6.5
  },
  "Divorced": {
   "p": 1,
   "cx": 420.4,
   "cy": 512.2,
   "rx": 6.2,
   "ry": 6.5
  }
 },
 "c1_onset": {
  "p": 2,
  "x": 210.9,
  "y": 668.7,
  "w": 352.6
 },
 "c1_location": {
  "p": 2,
  "x": 232.2,
  "y": 655.9,
  "w": 310.8
 },
 "c1_radiates": {
  "p": 2,
  "x": 216.7,
  "y": 643.0,
  "w": 326.5
 },
 "c1_frequency": {
  "Constantly": {
   "p": 2,
   "x": 88.2,
   "y": 619.0
  },
  "Frequent (75%)": {
   "p": 2,
   "x": 178.8,
   "y": 619.0
  },
  "Often (50%)": {
   "p": 2,
   "x": 256.8,
   "y": 619.0
  },
  "Rarely (25%)": {
   "p": 2,
   "x": 337.2,
   "y": 619.0
  }
 },
 "c1_trend": {
  "Worsening": {
   "p": 2,
   "x": 170.3,
   "y": 606.2
  },
  "Improving": {
   "p": 2,
   "x": 253.6,
   "y": 606.2
  },
  "Remaining unchanged": {
   "p": 2,
   "x": 390.3,
   "y": 606.2
  }
 },
 "c1_intensity": {
  "Severe": {
   "p": 2,
   "x": 254.7,
   "y": 593.4
  },
  "Mild": {
   "p": 2,
   "x": 313.7,
   "y": 593.4
  },
  "Moderate": {
   "p": 2,
   "x": 395.8,
   "y": 593.4
  }
 },
 "c1_scale": {
  "p": 2,
  "x": 453.7,
  "y": 580.8,
  "w": 57.4
 },
 "c1_depth": {
  "Superficial": {
   "p": 2,
   "x": 155.7,
   "y": 567.8
  },
  "Deep": {
   "p": 2,
   "x": 243.8,
   "y": 567.8
  }
 },
 "c1_character": {
  "Dull": {
   "p": 2,
   "x": 71.1,
   "y": 542.1
  },
  "Sharp": {
   "p": 2,
   "x": 137.9,
   "y": 542.1
  },
  "Burning": {
   "p": 2,
   "x": 210.9,
   "y": 542.1
  },
  "Aching": {
   "p": 2,
   "x": 279.5,
   "y": 542.1
  },
  "Knife-like": {
   "p": 2,
   "x": 358.4,
   "y": 542.1
  },
  "Throbbing": {
   "p": 2,
   "x": 439.3,
   "y": 542.1
  }
 },
 "c1_associated": {
  "Pins and needles": {
   "p": 2,
   "x": 126.6,
   "y": 516.5
  },
  "Tingling": {
   "p": 2,
   "x": 217.8,
   "y": 516.5
  },
  "Numbness": {
   "p": 2,
   "x": 313.3,
   "y": 516.5
  },
  "Twitching of muscles": {
   "p": 2,
   "x": 448.7,
   "y": 516.5
  }
 },
 "c1_associated_desc": {
  "lines": [
   {
    "p": 2,
    "x": 38.0,
    "y": 491.1,
    "w": 525.2
   },
   {
    "p": 2,
    "x": 38.0,
    "y": 478.2,
    "w": 530.4
   },
   {
    "p": 2,
    "x": 38.0,
    "y": 465.4,
    "w": 535.6
   }
  ]
 },
 "c1_provokes": {
  "Sitting": {
   "p": 2,
   "x": 93.5,
   "y": 439.6
  },
  "Standing": {
   "p": 2,
   "x": 190.6,
   "y": 439.6
  },
  "Walking": {
   "p": 2,
   "x": 279.1,
   "y": 439.6
  },
  "Lying": {
   "p": 2,
   "x": 350.1,
   "y": 439.6
  },
  "Lifting": {
   "p": 2,
   "x": 428.6,
   "y": 439.6
  },
  "Pushing": {
   "p": 2,
   "x": 519.3,
   "y": 439.6
  },
  "Pulling": {
   "p": 2,
   "x": 92.8,
   "y": 426.8
  },
  "Gripping": {
   "p": 2,
   "x": 189.3,
   "y": 426.8
  },
  "Hot/Cold": {
   "p": 2,
   "x": 280.1,
   "y": 426.8
  },
  "Coughing/Sneezing": {
   "p": 2,
   "x": 414.2,
   "y": 426.8
  },
  "Mental activities": {
   "p": 2,
   "x": 540.6,
   "y": 426.8
  },
  "Bright lights": {
   "p": 2,
   "x": 114.2,
   "y": 414.0
  }
 },
 "c1_provokes_other": {
  "p": 2,
  "x": 65.7,
  "y": 401.3,
  "w": 504.3
 },
 "c1_relieves": {
  "Sitting": {
   "p": 2,
   "x": 78.1,
   "y": 375.5
  },
  "Standing": {
   "p": 2,
   "x": 154.2,
   "y": 375.5
  },
  "Walking": {
   "p": 2,
   "x": 229.9,
   "y": 375.5
  },
  "Lying": {
   "p": 2,
   "x": 295.7,
   "y": 375.5
  },
  "Heat/Cold": {
   "p": 2,
   "x": 383.3,
   "y": 375.5
  },
  "Rest": {
   "p": 2,
   "x": 448.3,
   "y": 375.5
  },
  "Medications": {
   "p": 2,
   "x": 114.1,
   "y": 362.7
  }
 },
 "c2_onset": {
  "p": 3,
  "x": 210.9,
  "y": 648.8,
  "w": 352.6
 },
 "c2_location": {
  "p": 3,
  "x": 232.2,
  "y": 636.0,
  "w": 310.8
 },
 "c2_radiates": {
  "p": 3,
  "x": 216.7,
  "y": 623.2,
  "w": 326.5
 },
 "c2_frequency": {
  "Constantly": {
   "p": 3,
   "x": 88.2,
   "y": 599.2
  },
  "Frequent (75%)": {
   "p": 3,
   "x": 178.8,
   "y": 599.2
  },
  "Often (50%)": {
   "p": 3,
   "x": 256.8,
   "y": 599.2
  },
  "Rarely (25%)": {
   "p": 3,
   "x": 337.2,
   "y": 599.2
  }
 },
 "c2_trend": {
  "Worsening": {
   "p": 3,
   "x": 170.3,
   "y": 586.4
  },
  "Improving": {
   "p": 3,
   "x": 253.6,
   "y": 586.4
  },
  "Remaining unchanged": {
   "p": 3,
   "x": 390.3,
   "y": 586.4
  }
 },
 "c2_intensity": {
  "Severe": {
   "p": 3,
   "x": 254.7,
   "y": 573.5
  },
  "Mild": {
   "p": 3,
   "x": 313.7,
   "y": 573.5
  },
  "Moderate": {
   "p": 3,
   "x": 395.8,
   "y": 573.5
  }
 },
 "c2_scale": {
  "p": 3,
  "x": 453.7,
  "y": 560.9,
  "w": 57.4
 },
 "c2_depth": {
  "Superficial": {
   "p": 3,
   "x": 155.7,
   "y": 547.9
  },
  "Deep": {
   "p": 3,
   "x": 243.8,
   "y": 547.9
  }
 },
 "c2_character": {
  "Dull": {
   "p": 3,
   "x": 71.1,
   "y": 522.3
  },
  "Sharp": {
   "p": 3,
   "x": 137.9,
   "y": 522.3
  },
  "Burning": {
   "p": 3,
   "x": 210.9,
   "y": 522.3
  },
  "Aching": {
   "p": 3,
   "x": 279.5,
   "y": 522.3
  },
  "Knife-like": {
   "p": 3,
   "x": 358.4,
   "y": 522.3
  },
  "Throbbing": {
   "p": 3,
   "x": 439.3,
   "y": 522.3
  }
 },
 "c2_associated": {
  "Pins and needles": {
   "p": 3,
   "x": 126.6,
   "y": 483.8
  },
  "Tingling": {
   "p": 3,
   "x": 217.8,
   "y": 483.8
  },
  "Numbness": {
   "p": 3,
   "x": 313.3,
   "y": 483.8
  },
  "Twitching of muscles": {
   "p": 3,
   "x": 448.7,
   "y": 483.8
  }
 },
 "c2_associated_desc": {
  "lines": [
   {
    "p": 3,
    "x": 38.0,
    "y": 458.4,
    "w": 525.2
   },
   {
    "p": 3,
    "x": 38.0,
    "y": 445.6,
    "w": 530.4
   },
   {
    "p": 3,
    "x": 38.0,
    "y": 432.8,
    "w": 535.6
   }
  ]
 },
 "c2_provokes": {
  "Sitting": {
   "p": 3,
   "x": 93.5,
   "y": 406.9
  },
  "Standing": {
   "p": 3,
   "x": 190.6,
   "y": 406.9
  },
  "Walking": {
   "p": 3,
   "x": 279.1,
   "y": 406.9
  },
  "Lying": {
   "p": 3,
   "x": 350.1,
   "y": 406.9
  },
  "Lifting": {
   "p": 3,
   "x": 428.6,
   "y": 406.9
  },
  "Pushing": {
   "p": 3,
   "x": 519.3,
   "y": 406.9
  },
  "Pulling": {
   "p": 3,
   "x": 92.8,
   "y": 394.1
  },
  "Gripping": {
   "p": 3,
   "x": 189.3,
   "y": 394.1
  },
  "Hot/Cold": {
   "p": 3,
   "x": 280.1,
   "y": 394.1
  },
  "Coughing/Sneezing": {
   "p": 3,
   "x": 414.2,
   "y": 394.1
  },
  "Mental activities": {
   "p": 3,
   "x": 540.6,
   "y": 394.1
  },
  "Bright lights": {
   "p": 3,
   "x": 114.2,
   "y": 381.3
  }
 },
 "c2_provokes_other": {
  "p": 3,
  "x": 65.7,
  "y": 368.7,
  "w": 504.3
 },
 "c2_relieves": {
  "Sitting": {
   "p": 3,
   "x": 78.1,
   "y": 342.8
  },
  "Standing": {
   "p": 3,
   "x": 154.2,
   "y": 342.8
  },
  "Walking": {
   "p": 3,
   "x": 229.9,
   "y": 342.8
  },
  "Lying": {
   "p": 3,
   "x": 295.7,
   "y": 342.8
  },
  "Heat/Cold": {
   "p": 3,
   "x": 383.3,
   "y": 342.8
  },
  "Rest": {
   "p": 3,
   "x": 448.3,
   "y": 342.8
  },
  "Medications": {
   "p": 3,
   "x": 114.1,
   "y": 330.0
  }
 },
 "family_history": {
  "Diabetes": {
   "p": 4,
   "x": 37.6,
   "y": 623.7
  },
  "Neurological disorders": {
   "p": 4,
   "x": 90.7,
   "y": 623.7
  },
  "Depression / mental illness": {
   "p": 4,
   "x": 202.9,
   "y": 623.7
  },
  "Cancer": {
   "p": 4,
   "x": 332.0,
   "y": 623.7
  },
  "Heart disease": {
   "p": 4,
   "x": 37.6,
   "y": 610.7
  },
  "Autoimmune disorders": {
   "p": 4,
   "x": 112.3,
   "y": 610.7
  },
  "Stroke": {
   "p": 4,
   "x": 226.8,
   "y": 610.7
  },
  "Other": {
   "p": 4,
   "x": 269.6,
   "y": 610.7
  }
 },
 "family_other": {
  "p": 4,
  "x": 310.7,
  "y": 609.4,
  "w": 59.8
 },
 "medications": {
  "lines": [
   {
    "p": 4,
    "x": 380.0,
    "y": 596.5,
    "w": 190.5
   },
   {
    "p": 4,
    "x": 38.0,
    "y": 583.7,
    "w": 446.7
   }
  ]
 },
 "vitamins": {
  "Yes": {
   "p": 4,
   "x": 325.7,
   "y": 570.6
  },
  "No": {
   "p": 4,
   "x": 373.5,
   "y": 570.6
  }
 },
 "vitamins_need": {
  "Yes": {
   "p": 4,
   "x": 307.8,
   "y": 557.8
  },
  "No": {
   "p": 4,
   "x": 355.6,
   "y": 557.8
  }
 },
 "inner_soles": {
  "Yes": {
   "p": 4,
   "cx": 298.5,
   "cy": 548.0,
   "rx": 12.0,
   "ry": 6.5
  },
  "No": {
   "p": 4,
   "x": 325.1,
   "y": 545.0
  }
 },
 "heel_lifts": {
  "Yes": {
   "p": 4,
   "cx": 386.5,
   "cy": 548.0,
   "rx": 10.5,
   "ry": 6.5
  },
  "No": {
   "p": 4,
   "cx": 409.5,
   "cy": 548.0,
   "rx": 8.5,
   "ry": 6.5
  }
 },
 "sole_lifts": {
  "Yes": {
   "p": 4,
   "x": 108.2,
   "y": 532.2
  },
  "No": {
   "p": 4,
   "x": 156.0,
   "y": 532.2
  }
 },
 "arch_supports": {
  "Yes": {
   "p": 4,
   "x": 271.9,
   "y": 532.2
  },
  "No": {
   "p": 4,
   "x": 314.4,
   "y": 532.2
  }
 },
 "habit_alcohol": {
  "Heavy": {
   "p": 4,
   "x": 109.6,
   "y": 508.1
  },
  "Moderate": {
   "p": 4,
   "x": 145.6,
   "y": 508.1
  },
  "Light": {
   "p": 4,
   "x": 181.6,
   "y": 508.1
  },
  "None": {
   "p": 4,
   "x": 217.6,
   "y": 508.1
  }
 },
 "habit_exercise": {
  "Heavy": {
   "p": 4,
   "x": 328.7,
   "y": 508.1
  },
  "Moderate": {
   "p": 4,
   "x": 361.6,
   "y": 508.1
  },
  "Light": {
   "p": 4,
   "x": 397.6,
   "y": 508.1
  },
  "None": {
   "p": 4,
   "x": 433.6,
   "y": 508.1
  }
 },
 "habit_coffee": {
  "Heavy": {
   "p": 4,
   "x": 109.6,
   "y": 495.2
  },
  "Moderate": {
   "p": 4,
   "x": 145.6,
   "y": 495.2
  },
  "Light": {
   "p": 4,
   "x": 181.6,
   "y": 495.2
  },
  "None": {
   "p": 4,
   "x": 217.6,
   "y": 495.2
  }
 },
 "habit_sleep": {
  "Heavy": {
   "p": 4,
   "x": 328.0,
   "y": 495.2
  },
  "Moderate": {
   "p": 4,
   "x": 361.6,
   "y": 495.2
  },
  "Light": {
   "p": 4,
   "x": 397.6,
   "y": 495.2
  },
  "None": {
   "p": 4,
   "x": 433.6,
   "y": 495.2
  }
 },
 "habit_tobacco": {
  "Heavy": {
   "p": 4,
   "x": 109.6,
   "y": 482.3
  },
  "Moderate": {
   "p": 4,
   "x": 145.6,
   "y": 482.3
  },
  "Light": {
   "p": 4,
   "x": 181.6,
   "y": 482.3
  },
  "None": {
   "p": 4,
   "x": 217.6,
   "y": 482.3
  }
 },
 "habit_appetite": {
  "Heavy": {
   "p": 4,
   "x": 328.8,
   "y": 482.3
  },
  "Moderate": {
   "p": 4,
   "x": 361.6,
   "y": 482.3
  },
  "Light": {
   "p": 4,
   "x": 397.6,
   "y": 482.3
  },
  "None": {
   "p": 4,
   "x": 433.6,
   "y": 482.3
  }
 },
 "habit_cannabis": {
  "Heavy": {
   "p": 4,
   "x": 109.6,
   "y": 469.4
  },
  "Moderate": {
   "p": 4,
   "x": 145.6,
   "y": 469.4
  },
  "Light": {
   "p": 4,
   "x": 181.6,
   "y": 469.4
  },
  "None": {
   "p": 4,
   "x": 217.6,
   "y": 469.4
  }
 },
 "habit_drugs": {
  "Heavy": {
   "p": 4,
   "x": 109.6,
   "y": 456.5
  },
  "Moderate": {
   "p": 4,
   "x": 145.6,
   "y": 456.5
  },
  "Light": {
   "p": 4,
   "x": 181.6,
   "y": 456.5
  },
  "None": {
   "p": 4,
   "x": 217.6,
   "y": 456.5
  }
 },
 "symptoms": {
  "Low blood pressure": {
   "p": 4,
   "x": 58.6,
   "y": 433.3
  },
  "Low back pain": {
   "p": 4,
   "x": 153.2,
   "y": 433.3
  },
  "Difficulty digestion": {
   "p": 4,
   "x": 238.7,
   "y": 433.3
  },
  "Stroke": {
   "p": 4,
   "x": 322.6,
   "y": 433.3
  },
  "Eye pain": {
   "p": 4,
   "x": 406.6,
   "y": 433.3
  },
  "Varicose veins": {
   "p": 4,
   "x": 489.1,
   "y": 433.3
  },
  "High blood pressure": {
   "p": 4,
   "x": 58.6,
   "y": 406.9
  },
  "Sciatica": {
   "p": 4,
   "x": 153.2,
   "y": 406.9
  },
  "Hemorrhoids": {
   "p": 4,
   "x": 238.7,
   "y": 406.9
  },
  "Chest pain": {
   "p": 4,
   "x": 322.6,
   "y": 406.9
  },
  "Failing vision": {
   "p": 4,
   "x": 406.6,
   "y": 406.9
  },
  "Bed wetting": {
   "p": 4,
   "x": 489.1,
   "y": 406.9
  },
  "Allergy": {
   "p": 4,
   "x": 58.6,
   "y": 380.4
  },
  "Neck pain/stiffness": {
   "p": 4,
   "x": 153.2,
   "y": 380.4
  },
  "Nausea": {
   "p": 4,
   "x": 238.7,
   "y": 380.4
  },
  "Difficulty breathing": {
   "p": 4,
   "x": 322.6,
   "y": 380.4
  },
  "Tuberculosis": {
   "p": 4,
   "x": 406.6,
   "y": 380.4
  },
  "Frequent urination": {
   "p": 4,
   "x": 489.1,
   "y": 380.4
  },
  "Headache": {
   "p": 4,
   "x": 58.6,
   "y": 354.0
  },
  "Poor posture": {
   "p": 4,
   "x": 153.2,
   "y": 354.0
  },
  "Dizziness": {
   "p": 4,
   "x": 238.7,
   "y": 354.0
  },
  "Swelling of ankles": {
   "p": 4,
   "x": 322.6,
   "y": 354.0
  },
  "Bruise easily": {
   "p": 4,
   "x": 406.6,
   "y": 354.0
  },
  "Kidney infection/stone": {
   "p": 4,
   "x": 489.1,
   "y": 354.0
  },
  "Loss of sleep": {
   "p": 4,
   "x": 58.6,
   "y": 327.5
  },
  "Spinal curvatures": {
   "p": 4,
   "x": 153.2,
   "y": 327.5
  },
  "Fatigue": {
   "p": 4,
   "x": 238.7,
   "y": 327.5
  },
  "Sinus infection": {
   "p": 4,
   "x": 322.6,
   "y": 327.5
  },
  "Hay fever": {
   "p": 4,
   "x": 406.6,
   "y": 327.5
  },
  "Prostate trouble": {
   "p": 4,
   "x": 489.1,
   "y": 327.5
  },
  "Ulcers": {
   "p": 4,
   "x": 58.6,
   "y": 301.1
  },
  "Swollen joints": {
   "p": 4,
   "x": 153.2,
   "y": 301.1
  },
  "Pain over heart": {
   "p": 4,
   "x": 238.7,
   "y": 301.1
  },
  "Asthma": {
   "p": 4,
   "x": 322.6,
   "y": 301.1
  },
  "Nose bleeds": {
   "p": 4,
   "x": 406.6,
   "y": 301.1
  },
  "Cramps or backache": {
   "p": 4,
   "x": 489.1,
   "y": 301.1
  },
  "Numbness": {
   "p": 4,
   "x": 58.6,
   "y": 274.7
  },
  "Venereal disease": {
   "p": 4,
   "x": 153.2,
   "y": 274.7
  },
  "Poor circulation": {
   "p": 4,
   "x": 238.7,
   "y": 274.7
  },
  "Colds": {
   "p": 4,
   "x": 322.6,
   "y": 274.7
  },
  "Cancer": {
   "p": 4,
   "x": 406.6,
   "y": 274.7
  },
  "Excessive menses": {
   "p": 4,
   "x": 489.1,
   "y": 274.7
  },
  "Arthritis": {
   "p": 4,
   "x": 58.6,
   "y": 248.2
  },
  "Nervous depression": {
   "p": 4,
   "x": 153.2,
   "y": 248.2
  },
  "Rapid heart beat": {
   "p": 4,
   "x": 238.7,
   "y": 248.2
  },
  "Deafness": {
   "p": 4,
   "x": 322.6,
   "y": 248.2
  },
  "Pleurisy": {
   "p": 4,
   "x": 406.6,
   "y": 248.2
  },
  "Hot flashes": {
   "p": 4,
   "x": 489.1,
   "y": 248.2
  },
  "Bursitis": {
   "p": 4,
   "x": 58.6,
   "y": 221.8
  },
  "Colon trouble": {
   "p": 4,
   "x": 153.2,
   "y": 221.8
  },
  "Slow heart beat": {
   "p": 4,
   "x": 238.7,
   "y": 221.8
  },
  "Ear noise": {
   "p": 4,
   "x": 322.6,
   "y": 221.8
  },
  "Spitting": {
   "p": 4,
   "x": 406.6,
   "y": 221.8
  },
  "Irregular cycle": {
   "p": 4,
   "x": 489.1,
   "y": 221.8
  },
  "Foot trouble": {
   "p": 4,
   "x": 58.6,
   "y": 195.3
  },
  "Diarrhea": {
   "p": 4,
   "x": 153.2,
   "y": 195.3
  },
  "Anemia": {
   "p": 4,
   "x": 238.7,
   "y": 195.3
  },
  "Enlarged thyroid": {
   "p": 4,
   "x": 322.6,
   "y": 195.3
  },
  "Itching": {
   "p": 4,
   "x": 406.6,
   "y": 195.3
  },
  "Lumps in breast": {
   "p": 4,
   "x": 489.1,
   "y": 195.3
  },
  "Alcoholism": {
   "p": 4,
   "x": 58.6,
   "y": 168.9
  },
  "Diabetes": {
   "p": 4,
   "x": 153.2,
   "y": 168.9
  },
  "Glaucoma": {
   "p": 4,
   "x": 238.7,
   "y": 168.9
  },
  "Autoimmune disease": {
   "p": 4,
   "x": 322.6,
   "y": 168.9
  },
  "Mental disorder": {
   "p": 4,
   "x": 406.6,
   "y": 168.9
  },
  "Balance/coordination": {
   "p": 4,
   "x": 489.1,
   "y": 168.9
  },
  "Epilepsy": {
   "p": 4,
   "x": 58.6,
   "y": 142.4
  },
  "Polio": {
   "p": 4,
   "x": 153.2,
   "y": 142.4
  }
 },
 "family_doctor": {
  "p": 4,
  "x": 91.7,
  "y": 113.4,
  "w": 176.3
 },
 "send_report": {
  "Yes": {
   "p": 4,
   "x": 194.5,
   "y": 102.2
  },
  "No": {
   "p": 4,
   "x": 240.9,
   "y": 102.2
  }
 },
 "payment_person": {
  "p": 4,
  "x": 214.7,
  "y": 78.6,
  "w": 242.8
 },
 "signature": {
  "p": 5,
  "x": 120.2,
  "y": 694.0,
  "w": 227.1
 },
 "signature_date": {
  "p": 5,
  "x": 491.8,
  "y": 694.0,
  "w": 80.7
 }
};
