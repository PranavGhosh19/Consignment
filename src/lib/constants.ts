
export const SHIPMENT_TYPES = ["EXPORT", "IMPORT", "COASTAL MOVEMENT"] as const;

export const MODES_OF_SHIPMENT = [
  "Air Cargo",
  "Sea – FCL (Full Container Load)",
  "Sea – LCL (Less than Container Load)",
  "Sea – Break Bulk",
  "Courier / Express Cargo",
] as const;

export const PACKAGE_TYPES = [
    "PALLET",
    "BOX",
    "CARTON",
    "CASE",
    "BALES",
    "PACKETS",
    "CRATE",
    "DRUM",
    "BAG",
    "UNIT"
] as const;

export const EQUIPMENT_TYPES = [
    "20' Standard",
    "40' Standard",
    "40' High Cube",
    "20' Reefer",
    "40' Reefer",
    "20' Open Top",
    "40' Open Top",
    "20' Flat Rack",
    "40' Flat Rack",
] as const;

export const DIMENSION_UNITS = ["CMS", "FEET", "MM", "METRE"] as const;

export const INCENTIVE_SCHEMES = [
  "RoDTEP",
  "RoSCTL",
  "SEIS",
  "EPCG",
  "Duty Drawback",
  "None",
] as const;

export const CURRENCIES = ["USD", "EUR", "GBP", "INR", "AED", "JPY"] as const;

export const INCOTERMS = ["EXW", "FOB", "CIF", "DDP", "FCA", "CPT"] as const;

export const ATTACHMENT_TYPES = [
  "Certificate of Origin",
  "Fumigation Certificate",
  "Phytosanitary Certificate",
] as const;

export const INLAND_CONTAINER_DEPOTS = [
  "ICD Tughlakabad, New Delhi",
  "ICD Dadri, Uttar Pradesh",
  "ICD Sanathnagar, Hyderabad",
  "ICD Whitefield, Bangalore",
  "ICD Chinchwad, Pune",
  "ICD Nagpur, Maharashtra",
  "ICD Ludhiana, Punjab",
  "ICD Kanpur, Uttar Pradesh",
  "ICD Khodiyar, Ahmedabad",
  "ICD Pithampur, Indore",
  "Other",
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
  "Yokohama, Japan — JPYOK",
] as const;


type CargoTypesByMode = {
  [key in (typeof MODES_OF_SHIPMENT)[number]]: readonly string[];
};

export const CARGO_TYPES_BY_MODE: CargoTypesByMode = {
  "Air Cargo": [
    "General Cargo",
    "Perishable",
    "Live Animals",
    "HAZMAT",
  ],
  "Sea – FCL (Full Container Load)": [
    "General Cargo",
    "Bulk (Dry/Liquid)",
    "Reefer",
    "RoRo",
    "Oversized",
    "Project Cargo",
  ],
  "Sea – LCL (Less than Container Load)": [
    "General Cargo",
    "HAZMAT",
    "Perishable",
  ],
  "Sea – Break Bulk": [
    "General Cargo",
    "Bulk (Dry/Liquid)",
    "Oversized",
    "Project Cargo",
  ],
  "Courier / Express Cargo": ["Documents", "Samples", "Small Parcels"],
};

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
