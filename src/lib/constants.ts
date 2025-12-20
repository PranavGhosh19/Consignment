export const SHIPMENT_TYPES = ["EXPORT", "IMPORT", "COASTAL MOVEMENT"] as const;

export const MODES_OF_SHIPMENT = [
    "Sea – FCL (Full Container Load)",
    "Sea – LCL (Less than Container Load)",
    "Air Cargo",
    "Land – FTL (Full Truck Load)",
    "Land – LTL (Less than Truck Load)"
] as const;

export const DIMENSION_UNITS = ["CMS", "FEET", "MM", "METRE"] as const;

export const INCOTERMS = [
    "EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DPU", "DAP", "DDP"
] as const;

export const INCENTIVE_SCHEMES = [
    "None",
    "Advance Authorization (AA)",
    "Duty Free Import Authorization (DFIA)",
    "Export Promotion Capital Goods (EPCG)",
    "Transport and Marketing Assistance (TMA)",
    "RoDTEP"
] as const;

export const CURRENCIES = [
    "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR"
] as const;

export const ATTACHMENT_TYPES = [
    "Certificate of Origin",
    "Material Safety Data Sheet (MSDS)",
    "Test Reports",
    "Fumigation Certificate",
    "Phytosanitary Certificate",
    "Other"
] as const;

export const INLAND_CONTAINER_DEPOTS = [
    "ICD Tughlakabad, Delhi",
    "ICD Dadri, Uttar Pradesh",
    "ICD Loni, Ghaziabad, Uttar Pradesh",
    "ICD Nagpur, Maharashtra",
    "ICD Ludhiana, Punjab",
    "ICD Ahmedabad, Gujarat",
    "ICD Hyderabad, Telangana",
    "ICD Bangalore, Karnataka",
    "ICD Pithampur, Madhya Pradesh",
    "ICD Jaipur, Rajasthan",
    "Other"
] as const;

export const INDIAN_SEA_PORTS = [
    "Nhava Sheva (JNPT), Maharashtra",
    "Mundra, Gujarat",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Visakhapatnam, Andhra Pradesh",
    "Cochin, Kerala",
    "Tuticorin, Tamil Nadu",
    "Kandla, Gujarat",
    "Ennore, Tamil Nadu",
    "Haldia, West Bengal"
] as const;

export const FOREIGN_SEA_PORTS = [
    "Alexandria, Egypt — EGALY",
    "Algeciras, Spain — ESALG",
    "Antwerp-Bruges, Belgium — BEANR",
    "Balboa, Panama — PABLB",
    "Barcelona, Spain — ESBCN",
    "Beirut, Lebanon — LBBEY",
    "Busan, South Korea — KRPUS",
    "Callao, Peru — PECLL",
    "Cartagena, Colombia — COCTG",
    "Charleston, USA — USCHS",
    "Chennai, India — INMAA",
    "Chittagong, Bangladesh — BDCGP",
    "Colombo, Sri Lanka — LKCMB",
    "Constanta, Romania — ROCND",
    "Durban, South Africa — ZADUR",
    "Felixstowe, United Kingdom — GBFXT",
    "Fremantle, Australia — AUFRE",
    "Fujairah, UAE — AEFJR",
    "Gdansk, Poland — PLGDN",
    "Genoa, Italy — ITGOA",
    "Guangzhou, China — CNGGZ",
    "Hamburg, Germany — DEHAM",
    "Haifa, Israel — ILHFA",
    "Hong Kong, China — HKHKG",
    "Houston, USA — USHOU",
    "Incheon, South Korea — KRINC",
    "Izmir, Turkey — TRIZM",
    "Jakarta (Tanjung Priok), Indonesia — IDTPP",
    "Jebel Ali, UAE — AEJEA",
    "Jeddah, Saudi Arabia — SAJED",
    "Kaohsiung, Taiwan — TWKHH",
    "Kandla (Deendayal), India — INIXY",
    "Karachi, Pakistan — PKKHI",
    "Koper, Slovenia — SIKOP",
    "Laem Chabang, Thailand — THLCH",
    "Lagos, Nigeria — NGLOS",
    "Long Beach, USA — USLGB",
    "Los Angeles, USA — USLAX",
    "Manila, Philippines — PHMNL",
    "Marseille, France — FRMRS",
    "Melbourne, Australia — AUMEL",
    "Mombasa, Kenya — KEMBA",
    "Montevideo, Uruguay — UYMVD",
    "Montreal, Canada — CAMTR",
    "Mundra, India — INMUN",
    "Mumbai / JNPT, India — INNSA",
    "Nagoya, Japan — JPNGO",
    "New York & New Jersey, USA — USNYC",
    "Ningbo-Zhoushan, China — CNNGB",
    "Oakland, USA — USOAK",
    "Odessa, Ukraine — UAODS",
    "Osaka, Japan — JPOSA",
    "Paranaguá, Brazil — BRPNG",
    "Piraeus, Greece — GRPIR",
    "Port Klang, Malaysia — MYPKG",
    "Port Said, Egypt — EGPSD",
    "Qingdao, China — CNQDG",
    "Rotterdam, Netherlands — NLRTM",
    "Santos, Brazil — BRSSZ",
    "Savannah, USA — USSAV",
    "Seattle-Tacoma, USA — USSEA",
    "Shanghai, China — CNSHA",
    "Shenzhen, China — CNSZX",
    "Singapore, Singapore — SGSIN",
    "Surabaya, Indonesia — IDSUB",
    "Tanger Med, Morocco — MATNG",
    "Tanjung Pelepas, Malaysia — MYTPP",
    "Tianjin, China — CNTJN",
    "Tokyo, Japan — JPTYO",
    "Valencia, Spain — ESVLC",
    "Vancouver, Canada — CAVAN",
    "Veracruz, Mexico — MXVER",
    "Visakhapatnam, India — INVTZ",
    "Yokohama, Japan — JPYOK"
] as const;

export const EQUIPMENT_TYPES = [
  "20' Standard Dry",
  "40' Standard Dry",
  "40' High Cube",
  "20' Reefer",
  "40' Reefer",
  "20' Open Top",
  "40' Open Top",
  "20' Flat Rack",
  "40' Flat Rack",
  "20' Tank",
  "45' High Cube",
  "Other"
] as const;

export const PACKAGE_TYPES = [
    "BAGS", "BALES", "BARRELS", "BOXES", "BUNDLES", "CAGES", "CANISTERS", "CANS", "CARTONS", "CASES", "COILS", "CRATES", "CYLINDERS", "DRUMS", "PALLETS", "PIECES", "REELS", "ROLLS", "SKIDS", "UNITS", "OTHER"
] as const;

export const CARGO_TYPES = [
    "General Cargo",
    "Bulk (Dry)",
    "Bulk (Liquid)",
    "Reefer / Temperature-Controlled",
    "HAZMAT",
    "Perishable",
    "Roll-on/Roll-off (RoRo)",
    "Oversized / Out-of-Gauge",
    "Project Cargo",
    "Live Animals"
] as const;
