import { PLACE_BY, PLACES } from "./places";
import type { BBox, Place, Region, RegionKind } from "./types";

const FOCUS: Record<string, BBox> = {
  USA: [-125.5, 24.2, -66.5, 49.6],
  CAN: [-132, 46.5, -59, 62],
  RUS: [27, 50, 140, 70],
  FRA: [-5.2, 41.3, 9.7, 51.2],
  NOR: [4.4, 57.9, 31.2, 71],
  NZL: [166.2, -47.4, 178.6, -34.2],
  CHL: [-76.2, -55.5, -68.2, -17.4],
  GRL: [-62, 60, -32, 82],
  AUS: [112.5, -44, 154, -12],
  IDN: [95, -9, 141, 6],
  CHN: [73.5, 18, 135, 48],
  FJI: [176.9, -19.3, 181.6, -16],
};

export function focusBBox(place: Place): BBox {
  const special = FOCUS[place.iso];
  if (special) return special;
  const [x0, y0, x1, y1] = place.bbox;
  const width = x1 - x0;
  if (width > 80 || width < 0) {
    return [place.lon - 12, Math.max(-56, place.lat - 10), place.lon + 12, Math.min(72, place.lat + 10)];
  }
  return place.bbox;
}

const ROWS = `
USA|Northeast Corridor|metro|40.4|-74.4|160|2|8|8|Boston to Washington — jobs and capital, with housing as the tax
USA|Bay Area & Northern California|metro|37.8|-122.3|90|4|6|12|Venture, talent, and a cost of living that leads the country
USA|Southern California|metro|34.1|-118.3|110|6|4|6|Climate, entertainment, trade, and strained housing
USA|Texas Triangle|metro|30.6|-97.4|180|2|6|7|Dallas, Austin, Houston — in-migration and energy-to-tech capital
USA|South Florida|tourist|26.1|-80.2|90|6|2|6|Miami's mix of tourism, finance, and hurricane exposure
USA|Midwest|industrial|41.8|-87.8|160|2|4|2|Chicago and the Great Lakes production belt
USA|Pacific Northwest|metro|47.5|-122.3|100|6|4|6|Seattle and Portland — tech, ports, and rain
USA|Mountain West|interior|39.3|-111.5|200|4|2|3|Denver to Salt Lake — outdoors, growth, and thin transit
USA|Hawaii|tourist|20.6|-157.2|70|10|-2|2|A tourism economy with a housing wall for residents
USA|Alaska|resource|61.2|-149.9|120|-2|2|2|Resource wages, distance, and a hard climate
CAN|Toronto & Ontario|metro|43.7|-79.4|80|2|6|6|The country's job and immigration engine
CAN|Montreal & Quebec|metro|45.6|-73.6|70|4|2|3|Culture, aerospace, and a distinct language market
CAN|British Columbia|coast|49.3|-123.1|90|8|2|4|Vancouver and the coast — livable, expensive, trade-facing
CAN|Alberta|resource|51.2|-114.1|120|0|4|4|Energy wages and the Rockies visitor belt
CAN|Atlantic Canada|coast|45.2|-63.2|110|4|-2|0|Smaller cities, slower growth, a strong tourism summer
MEX|Mexico City|capital|19.4|-99.1|50|0|6|6|The corporate and cultural core
MEX|Riviera Maya|tourist|20.8|-87.1|70|8|-2|4|Cancún to Tulum — the visitor economy
MEX|Baja & Los Cabos|tourist|22.9|-109.9|60|6|0|3|Pacific resorts and a US weekend market
MEX|Monterrey & the north|industrial|25.7|-100.3|70|-2|6|6|Nearshoring factories and cross-border trade
MEX|Oaxaca & the south|tourist|17.0|-96.5|70|4|-4|-2|Culture and tourism, thinner job markets
GBR|London|metro|51.5|-0.12|40|2|8|10|Global services, extreme housing costs
GBR|Northern England|industrial|53.5|-2.2|70|-2|2|0|Manchester, Leeds, Liverpool — a cheaper, rebuilding north
GBR|Scotland|interior|56.5|-4.2|90|4|0|1|Edinburgh, Glasgow, and the Highlands visitor economy
GBR|Cornwall & the southwest|tourist|50.4|-4.7|60|6|-4|0|Coast, second homes, thin winter work
GBR|Wales|interior|52.1|-3.8|60|2|-2|-1|Landscape and a smaller urban job base
GBR|Northern Ireland|metro|54.6|-5.9|40|0|0|0|Belfast's services revival, still a small market
IRL|Dublin|metro|53.3|-6.3|30|2|8|8|Tech and pharma headquarters, a brutal housing market
IRL|Wild Atlantic Way|tourist|53.3|-9.4|70|8|-4|1|The visitor coast from Galway to Kerry
FRA|Île-de-France|metro|48.9|2.35|40|0|8|8|Paris — jobs, culture, and a commuter-cost machine
FRA|Provence & Côte d'Azur|tourist|43.6|5.4|70|10|-2|3|The southern visitor belt
FRA|French Alps|tourist|45.9|6.7|60|8|-2|2|Chamonix to the Savoie ski economy
FRA|Lyon & the Rhône|metro|45.8|4.8|50|2|4|3|France's second industrial and food city
FRA|Nouvelle-Aquitaine|tourist|44.8|-0.6|80|6|-2|1|Bordeaux, wine, and the Atlantic coast
FRA|Brittany|coast|48.2|-2.9|70|6|-4|0|A cooler coast with a strong local identity
FRA|Occitanie|interior|43.6|1.5|80|4|0|1|Toulouse aerospace and a wide south
DEU|Berlin|metro|52.5|13.4|35|4|4|6|Startups, culture, and still-cheaper rents than Munich
DEU|Bavaria|metro|48.1|11.6|70|4|6|6|Munich and the alpine south — high wages, high costs
DEU|Rhine-Ruhr|industrial|51.4|6.9|60|-2|4|2|Germany's industrial density
DEU|Hamburg & the north|metro|53.6|10.0|50|2|4|3|Port, media, and a looser housing market
DEU|Baden-Württemberg|industrial|48.7|9.2|60|2|6|5|Cars, Mittelstand, and export depth
NLD|Randstad|metro|52.2|4.7|40|2|8|7|Amsterdam, Rotterdam, Utrecht — one labor market
BEL|Brussels|capital|50.8|4.4|25|0|4|4|EU institutions and a bilingual services core
BEL|Flanders|industrial|51.1|3.7|40|2|4|3|Antwerp's port and a dense SME belt
CHE|Zurich|metro|47.4|8.5|25|2|8|8|Switzerland's financial and corporate center
CHE|Lake Geneva|metro|46.2|6.1|30|4|4|6|Geneva, Lausanne, and the international-org economy
CHE|Swiss Alps|tourist|46.6|8.0|50|8|-2|2|The visitor and second-home Alps
AUT|Vienna|metro|48.2|16.4|25|4|4|4|A livable capital with a slower venture scene
AUT|Tyrol & the Alps|tourist|47.3|11.4|50|8|-2|2|Ski, summer hiking, and a tight local housing market
ESP|Madrid|metro|40.4|-3.7|40|2|6|6|The political and corporate capital
ESP|Catalonia|metro|41.5|2.1|50|4|4|5|Barcelona — tourism, design, and a housing fight
ESP|Andalusia|tourist|37.4|-5.0|90|6|-2|2|Seville, Granada, Málaga, and the southern coast
ESP|Balearic Islands|tourist|39.6|2.9|40|8|-4|3|Mallorca and Ibiza — visitors and housing stress
ESP|Canary Islands|tourist|28.3|-15.6|50|8|-2|2|Year-round sun and a tourism monoculture
ESP|Valencia & the east|coast|39.5|-0.4|40|6|0|2|A more affordable Mediterranean city belt
ESP|Basque Country|industrial|43.3|-2.7|40|2|4|3|Industry, food, and high local incomes
ITA|Milan & Lombardy|metro|45.5|9.2|40|2|8|7|Italy's job and fashion-finance core
ITA|Rome & Lazio|capital|41.9|12.5|40|4|2|2|Government, tourism, and a slower private economy
ITA|Tuscany|tourist|43.4|11.2|50|10|-2|2|The archetype of a visitor landscape
ITA|Veneto|metro|45.4|12.2|40|4|4|3|Venice tourism plus a strong SME hinterland
ITA|Amalfi & Campania|tourist|40.6|14.5|40|8|-4|1|The coast people mean when they say southern Italy
ITA|Sicily|tourist|37.5|14.1|70|6|-6|-1|Tourism and a thin formal job market
ITA|Italian Alps|tourist|46.5|11.3|50|6|-2|1|Dolomites and the winter economy
PRT|Lisbon|metro|38.7|-9.1|25|6|4|5|A remote-work magnet with local housing anger
PRT|Porto & the north|metro|41.1|-8.6|30|4|2|2|Wine, industry, and a slightly kinder cost base
PRT|Algarve|tourist|37.1|-8.2|40|10|-6|2|The southern resort coast
PRT|Madeira|tourist|32.7|-16.9|20|8|-2|1|A year-round island climate
GRC|Athens|metro|38.0|23.7|30|2|4|3|Services, tourism spillover, and dense housing
GRC|Cyclades|tourist|37.1|25.2|40|10|-6|2|Santorini, Mykonos, and the island season
GRC|Crete|tourist|35.2|24.9|50|8|-2|1|A longer season than the small islands
GRC|Thessaloniki & the north|metro|40.6|22.9|40|0|2|1|Greece's second city
HRV|Dalmatian coast|tourist|43.2|16.7|60|10|-4|3|Split to Dubrovnik
HRV|Istria|tourist|45.2|13.9|40|8|-2|2|The northern Adriatic, closer to Italy
HRV|Zagreb|capital|45.8|16.0|25|0|4|2|The inland job market
TUR|Istanbul|metro|41.0|29.0|40|2|6|5|The country's commercial capital, split by the Bosphorus
TUR|Aegean & Izmir|tourist|38.4|27.0|50|6|0|2|A milder coast and a real city economy
TUR|Cappadocia|tourist|38.6|34.8|40|8|-6|1|Balloon-tourism country
TUR|Antalya coast|tourist|36.8|31.0|50|8|-4|2|The big resort south
TUR|Ankara|capital|39.9|32.8|30|-2|2|1|Government and universities, less visitor glow
POL|Warsaw|metro|52.2|21.0|30|0|6|6|The corporate and startup core
POL|Kraków & the south|metro|50.1|19.9|40|4|4|3|Tech offices and a dense visitor old town
POL|Gdańsk & the Baltic|coast|54.4|18.6|30|4|2|2|The port, beaches, and a shipyard history
CZE|Prague|metro|50.1|14.4|20|6|4|4|A visitor capital that is also the national job market
HUN|Budapest|metro|47.5|19.0|20|4|4|3|Most of Hungary's formal opportunity sits here
ROU|Bucharest|metro|44.4|26.1|25|0|6|4|Services and a fast private sector
ROU|Transylvania|tourist|46.8|23.6|50|6|0|1|Cluj, Brașov, and the visitor towns
SWE|Stockholm|metro|59.3|18.1|30|2|6|8|Sweden's venture and headquarters city
SWE|Malmö & the south|metro|55.6|13.0|30|2|2|2|A bridge to Copenhagen
SWE|Swedish Lapland|tourist|67.8|20.2|80|6|-6|0|Winter tourism and very thin population
NOR|Oslo|metro|59.9|10.7|25|2|6|5|Oil-wealth services and a costly city
NOR|Fjord Norway|tourist|61.0|6.6|70|10|-4|2|Bergen and the western visitor coast
NOR|Northern Norway|interior|69.4|19.5|80|2|-2|0|Fisheries, energy, and the midnight sun
DNK|Copenhagen|metro|55.7|12.6|20|4|6|6|Almost a city-state economy inside Denmark
FIN|Helsinki|metro|60.2|24.9|25|2|6|6|Tech, design, and the national labor market
FIN|Lapland|tourist|67.6|26.5|80|8|-6|1|Rovaniemi and the winter visitor season
ISL|Reykjavík & the south|metro|64.1|-21.9|40|4|4|3|Where almost everyone, and every visitor, actually is
CHE2|skip|metro|0|0|0|0|0|0|unused
NLD2|skip|metro|0|0|0|0|0|0|unused
`.trim();

const MORE = `
ARE|Dubai|metro|25.2|55.3|25|4|6|10|The region's air hub, tourism brand, and cost peak
ARE|Abu Dhabi|capital|24.5|54.4|30|2|4|6|Energy wealth and a quieter capital
SAU|Riyadh|capital|24.7|46.7|40|0|4|6|The reform and corporate center
SAU|Jeddah & the Red Sea|coast|21.5|39.2|40|4|2|4|The commercial coast and new resort bets
SAU|NEOM & Tabuk|tourist|28.0|35.2|50|-2|0|4|A project region more than a lived-in city, for now
QAT|Doha|metro|25.3|51.5|20|2|4|5|A compact, high-income capital
ISR|Tel Aviv|metro|32.1|34.8|20|2|8|12|Startups on a beach, with security always in the frame
ISR|Jerusalem|capital|31.8|35.2|15|-2|0|0|History, faith, and politics more than venture
JOR|Amman|capital|32.0|35.9|20|0|4|2|The stable services capital of the Levant
JOR|Petra & the south|tourist|30.3|35.4|40|8|-6|1|The visitor south, including Wadi Rum
EGY|Cairo|metro|30.0|31.2|30|-2|4|3|A megacity labor market
EGY|Red Sea resorts|tourist|27.4|33.8|60|8|-4|3|Hurghada and Sharm — the beach product
EGY|Luxor & Upper Egypt|tourist|25.7|32.6|40|6|-6|0|Antiquities tourism
EGY|Alexandria|coast|31.2|29.9|25|2|0|0|The Mediterranean second city
MAR|Casablanca|metro|33.6|-7.6|25|0|4|4|Business Morocco
MAR|Marrakech|tourist|31.6|-8.0|30|8|-2|3|The visitor city people fly to
MAR|Tangier|coast|35.8|-5.8|25|2|4|4|The strait, the port, and European industry
ZAF|Cape Town & Western Cape|tourist|-33.9|18.5|40|10|2|4|The country's livability and tourism brand
ZAF|Johannesburg & Gauteng|metro|-26.2|28.0|40|-4|6|5|Jobs and corporate HQs, with a safety discount
ZAF|Durban & KwaZulu-Natal|coast|-29.8|31.0|30|2|0|1|The Indian Ocean port city
ZAF|Garden Route|tourist|-34.0|23.0|50|8|-6|1|A thin, beautiful coastal strip
NGA|Lagos|metro|6.5|3.4|30|-2|8|6|West Africa's commercial capital
NGA|Abuja|capital|9.1|7.5|25|0|2|2|A planned capital, quieter than Lagos
NGA|Port Harcourt|resource|4.8|7.0|25|-4|2|2|Oil, and the security issues that follow it
KEN|Nairobi|metro|-1.3|36.8|25|0|6|6|Regional HQs, tech, and traffic
KEN|Mombasa & the coast|tourist|-4.0|39.6|30|6|-2|2|Beaches and the old port
KEN|Maasai Mara & Rift|tourist|-1.3|35.2|40|6|-6|1|The safari circuit
GHA|Accra|metro|5.6|-0.2|20|2|4|4|A stable coastal capital
RWA|Kigali|capital|-1.9|30.1|15|4|4|4|A small, carefully run capital
TZA|Dar es Salaam|metro|-6.8|39.2|20|0|4|3|The commercial city
TZA|Zanzibar|tourist|-6.1|39.3|20|10|-4|3|The island visitor economy
TZA|Arusha & the north|tourist|-3.4|36.7|30|6|-2|2|Safari logistics
ETH|Addis Ababa|capital|9.0|38.7|20|0|4|2|The highland capital and AU seat
IND|Delhi NCR|metro|28.6|77.2|40|-2|6|6|Government, corporates, and bad air
IND|Mumbai & Maharashtra|metro|19.1|72.9|35|0|8|8|Finance, film, and ports
IND|Bengaluru|metro|13.0|77.6|25|2|6|12|The country's tech and venture core
IND|Hyderabad|metro|17.4|78.5|25|2|6|8|Pharma, tech campuses, and a growing skyline
IND|Chennai & Tamil Nadu|industrial|13.1|80.3|30|0|4|4|Autos, electronics, and a drier south
IND|Goa|tourist|15.4|74.0|25|8|-2|2|Beaches and a long-stay visitor crowd
IND|Kerala|tourist|10.1|76.4|40|8|0|1|Backwaters, literacy, and remittances
IND|Rajasthan|tourist|26.9|75.8|60|6|-2|1|Jaipur and the desert circuit
IND|Kolkata|metro|22.6|88.4|25|0|2|1|The east's cultural and port city
CHN|Beijing|capital|39.9|116.4|40|0|4|4|Politics, universities, and headquarters
CHN|Shanghai|metro|31.2|121.5|35|2|8|8|The commercial capital
CHN|Pearl River Delta|industrial|22.8|113.8|50|0|8|8|Shenzhen, Guangzhou, and the factory-to-tech shift
CHN|Chengdu & Sichuan|interior|30.7|104.1|40|4|4|4|A western growth city with a slower cost base
CHN|Hainan|tourist|19.5|109.6|40|8|-4|2|The tropical island experiment
JPN|Tokyo|metro|35.7|139.7|40|2|8|8|The deepest urban job market in the country
JPN|Osaka & Kansai|metro|34.7|135.5|40|2|4|3|Japan's second commercial region
JPN|Kyoto|tourist|35.0|135.8|20|8|-2|2|Culture tourism sitting next to Kansai jobs
JPN|Hokkaido|tourist|43.1|141.4|70|6|-4|1|Sapporo, snow, and space
JPN|Okinawa|tourist|26.3|127.8|30|10|-4|1|A subtropical visitor economy
JPN|Fukuoka|metro|33.6|130.4|25|4|2|2|A more human-scaled Kyushu city
KOR|Seoul|metro|37.5|127.0|30|0|8|8|Almost half the country's opportunity
KOR|Busan|metro|35.2|129.1|25|2|2|2|The southern port
KOR|Jeju|tourist|33.4|126.5|25|10|-4|2|The honeymoon and hike island
TWN|Taipei|metro|25.0|121.5|20|2|6|8|Semiconductors' management city
TWN|Taichung|metro|24.1|120.7|20|2|4|3|A central industrial city
TWN|Kaohsiung|industrial|22.6|120.3|20|2|2|2|The southern port
HKG|Hong Kong Island & Kowloon|metro|22.3|114.2|12|0|6|8|Finance, a superb port, and impossible rents
SGP|Central Singapore|metro|1.3|103.85|8|0|6|8|The city-state's job core
SGP|East Coast & Sentosa|tourist|1.3|103.9|8|4|-2|2|The visitor and residential east
IDN|Jakarta|metro|-6.2|106.8|30|-4|6|6|The megacity — jobs, floods, and traffic
IDN|Bali|tourist|-8.4|115.2|30|12|-4|4|The world's default island brand
IDN|Yogyakarta|tourist|-7.8|110.4|20|6|-2|1|Culture and students
IDN|Bandung|metro|-6.9|107.6|20|4|2|2|A cooler highland city above Jakarta
THA|Bangkok|metro|13.8|100.5|30|2|6|6|The primate city
THA|Phuket & the Andaman|tourist|7.9|98.3|30|10|-6|4|Beach tourism and a real estate cycle
THA|Chiang Mai|tourist|18.8|99.0|25|8|0|2|The long-stay and digital-nomad north
THA|Pattaya & the east|tourist|12.9|100.9|25|4|-2|2|A heavier, closer-in resort coast
VNM|Hanoi|capital|21.0|105.8|20|0|4|3|The political capital
VNM|Ho Chi Minh City|metro|10.8|106.7|25|2|8|7|The commercial south
VNM|Da Nang & the central coast|tourist|16.0|108.2|30|8|2|3|Beaches between the two big cities
VNM|Ha Long|tourist|20.9|107.2|25|8|-6|1|The bay people come to see
MYS|Kuala Lumpur|metro|3.1|101.7|25|2|6|6|The national services core
MYS|Penang|industrial|5.4|100.3|20|4|4|5|Electronics and street food
MYS|Sabah|tourist|5.9|116.1|40|6|-2|1|Borneo's visitor side
PHL|Manila|metro|14.6|121.0|25|-2|6|5|The dense, complicated capital
PHL|Cebu|metro|10.3|123.9|20|4|4|3|The Visayas hub
PHL|Palawan|tourist|9.8|118.7|40|12|-8|2|A thin, famous island economy
AUS|Sydney|metro|-33.9|151.2|30|4|6|6|Harbor, finance, and housing stress
AUS|Melbourne|metro|-37.8|145.0|30|4|6|5|Culture, sport, and a broad job base
AUS|Brisbane & Gold Coast|tourist|-27.6|153.2|40|6|2|4|Sun, migration, and the 2032 Olympics build
AUS|Perth|resource|-31.9|115.9|25|2|4|4|Mining services and isolation
AUS|Cairns & the Reef|tourist|-16.8|145.7|40|10|-6|2|The reef gateway
AUS|Tasmania|tourist|-42.0|146.8|50|6|-4|0|A cooler, smaller island economy
NZL|Auckland|metro|-36.9|174.8|25|2|6|4|A third of the country, and the housing argument
NZL|Wellington|capital|-41.3|174.8|15|4|2|2|Government, film, and wind
NZL|Canterbury|metro|-43.5|172.6|25|2|2|1|Christchurch and the rebuild
NZL|Queenstown & Otago|tourist|-45.0|168.7|30|12|-6|3|The adventure-tourism capital
BRA|São Paulo|metro|-23.5|-46.6|30|0|8|8|The industrial and financial heart
BRA|Rio de Janeiro|tourist|-22.9|-43.2|30|6|2|3|Landscape, tourism, and a safety discount
BRA|Brasília|capital|-15.8|-47.9|25|-2|2|1|A planned capital of public jobs
BRA|Bahia & the northeast coast|tourist|-13.0|-38.5|50|6|-2|1|Salvador and the beach northeast
BRA|Manaus & the Amazon|interior|-3.1|-60.0|40|-4|0|0|A free-trade island in the forest
BRA|Florianópolis & the south|coast|-27.6|-48.5|25|8|2|3|A higher-income, beach-and-tech south
ARG|Buenos Aires|metro|-34.6|-58.4|30|2|6|4|Culture and services, priced in a volatile currency
ARG|Mendoza|tourist|-32.9|-68.8|30|6|0|2|Wine country
ARG|Bariloche & the lakes|tourist|-41.1|-71.3|30|8|-4|1|The Andean visitor belt
ARG|Patagonia|resource|-48.0|-68.0|80|2|0|1|Energy, sheep, and distance
CHL|Santiago|metro|-33.4|-70.6|25|0|6|5|Almost the whole formal economy
CHL|Valparaíso|coast|-33.0|-71.6|20|4|0|1|The port and a university coast
CHL|Atacama|tourist|-23.5|-68.2|50|6|-6|1|Desert tourism and mining
CHL|Chilean Patagonia|tourist|-51.0|-72.9|60|8|-8|0|Torres del Paine and very few residents
COL|Bogotá|metro|4.7|-74.1|25|-2|6|5|The highland capital
COL|Medellín|metro|6.2|-75.6|20|4|6|6|The turnaround city, now a remote-work magnet
COL|Cartagena & the Caribbean|tourist|10.4|-75.5|30|8|-2|3|The walled city and the coast
COL|Coffee Axis|tourist|4.8|-75.7|30|8|-4|1|The Andean coffee towns
PER|Lima|metro|-12.0|-77.0|25|0|6|4|The desert capital
PER|Cusco & the Sacred Valley|tourist|-13.5|-71.9|30|10|-6|3|Machu Picchu's gateway
PER|Arequipa|interior|-16.4|-71.5|20|4|0|1|The white city of the south
URY|Montevideo|metro|-34.9|-56.2|20|2|4|3|A calm capital
URY|Punta del Este|tourist|-34.9|-54.9|15|8|-6|3|A seasonal resort market
CRI|San José|metro|9.9|-84.1|20|0|4|2|The central-valley job market
CRI|Guanacaste|tourist|10.6|-85.4|30|8|-4|3|Pacific beaches and US flights
PAN|Panama City|metro|9.0|-79.5|20|0|6|6|The canal, banks, and towers
PAN|Bocas del Toro|tourist|9.3|-82.2|20|8|-6|1|A small Caribbean corner
DOM|Santo Domingo|metro|18.5|-69.9|20|0|4|2|The capital
DOM|Punta Cana|tourist|18.6|-68.4|25|10|-8|4|An all-inclusive factory coast
CUB|Havana|metro|23.1|-82.4|20|2|0|0|The city visitors are allowed to romanticize
CUB|Varadero|tourist|23.2|-81.3|15|6|-4|1|The resort strip
PRI|San Juan|metro|18.5|-66.1|15|2|4|3|A US-linked services and tourism capital
JAM|Kingston|metro|18.0|-76.8|15|-2|2|1|The capital, with a safety caveat
JAM|Montego Bay|tourist|18.5|-77.9|20|6|-2|2|The north-coast resort belt
CYM|Grand Cayman|metro|19.3|-81.4|10|4|6|8|Finance and beaches, very small
BHS|Nassau|tourist|25.1|-77.3|15|4|0|3|Cruise and offshore services
GEO|Tbilisi|metro|41.7|44.8|15|4|4|4|A walkable capital with a tourism boom
GEO|Batumi|tourist|41.6|41.6|15|6|0|2|The Black Sea resort
ARM|Yerevan|metro|40.2|44.5|15|2|2|2|A compact capital
AZE|Baku|metro|40.4|49.9|20|0|4|4|Oil, the Caspian, and a polished waterfront
KAZ|Almaty|metro|43.2|76.9|20|4|4|3|The more livable commercial city
KAZ|Astana|capital|51.1|71.4|20|-2|2|3|The planned capital on the steppe
UZB|Tashkent|metro|41.3|69.3|20|0|4|2|The region's largest capital
UZB|Samarkand|tourist|39.7|67.0|15|8|-4|1|The Silk Road visitor city
UKR|Kyiv|metro|50.4|30.5|20|-4|2|0|The capital under wartime conditions
UKR|Lviv|metro|49.8|24.0|15|2|2|1|The safer west, and a wartime services hub
UKR|Odesa|coast|46.5|30.7|20|-2|0|0|The Black Sea port, exposed
RUS|Moscow|metro|55.8|37.6|30|0|6|4|Where Russian money and jobs concentrate
RUS|Saint Petersburg|metro|59.9|30.3|20|4|2|2|The cultural second city
RUS|Sochi|tourist|43.6|39.7|20|6|-2|1|The Black Sea resort
PAK|Karachi|metro|24.9|67.0|25|-4|4|3|The port megacity
PAK|Lahore|metro|31.5|74.3|20|2|2|2|The cultural and industrial Punjab capital
PAK|Islamabad|capital|33.7|73.1|15|4|2|1|A planned, calmer capital
BGD|Dhaka|metro|23.8|90.4|20|-6|4|3|One of the densest job markets on earth
BGD|Chittagong|industrial|22.3|91.8|20|-2|4|3|The port and the garment coast
LKA|Colombo|metro|6.9|79.8|15|0|4|3|The commercial capital
LKA|South coast|tourist|6.0|80.3|20|8|-4|2|Galle and the beach towns
LKA|Hill country|tourist|7.1|80.7|25|6|-4|0|Kandy and the tea highlands
NPL|Kathmandu|metro|27.7|85.3|15|0|2|1|The valley capital
NPL|Pokhara|tourist|28.2|84.0|15|8|-4|1|Lakes and the Annapurna gateway
MDV|Malé atolls|tourist|3.8|73.4|30|6|2|4|The entire country is the visitor product
MUS|Mauritius coast|tourist|-20.2|57.5|20|8|0|3|A small, orderly island economy
KHM|Siem Reap|tourist|13.4|103.9|20|8|-6|2|Angkor
KHM|Phnom Penh|metro|11.6|104.9|15|0|4|2|The capital
LAO|Luang Prabang|tourist|19.9|102.1|15|8|-6|1|The heritage town
VUT|Port Vila|tourist|-17.7|168.3|10|4|0|1|A small Pacific capital
FJI|Viti Levu|tourist|-18.1|178.0|30|6|0|2|Most of Fiji's people and visitors
CPV|Santiago & Sal|tourist|16.0|-24.0|20|6|0|2|Island tourism off West Africa
SEN|Dakar|metro|14.7|-17.4|15|2|4|3|The most connected city in francophone West Africa
MAR2|skip|metro|0|0|0|0|0|0|unused
`.trim();

const KINDS = new Set<RegionKind>(["metro", "tourist", "industrial", "capital", "coast", "interior", "resource"]);

function parseRows(block: string): Region[] {
  const out: Region[] = [];
  for (const line of block.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.includes("|skip|")) continue;
    const [iso, name, kind, lat, lon, km, dL, dW, dI, note] = trimmed.split("|");
    if (!iso || !PLACE_BY[iso] || !KINDS.has(kind as RegionKind)) continue;
    const slug = name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    out.push({
      id: `${iso}:${slug}`,
      iso,
      name,
      kind: kind as RegionKind,
      lat: Number(lat),
      lon: Number(lon),
      km: Number(km),
      dL: Number(dL),
      dW: Number(dW),
      dI: Number(dI),
      note,
      named: true,
    });
  }
  return out;
}

const NAMED = parseRows(`${ROWS}\n${MORE}`);
const NAMED_BY_ISO = new Map<string, Region[]>();
for (const region of NAMED) {
  const list = NAMED_BY_ISO.get(region.iso);
  if (list) list.push(region);
  else NAMED_BY_ISO.set(region.iso, [region]);
}

function spanKm(place: Place): number {
  const [x0, y0, x1, y1] = focusBBox(place);
  const mid = ((y0 + y1) / 2) * (Math.PI / 180);
  const dx = Math.abs(x1 - x0) * 111 * Math.max(0.25, Math.cos(mid));
  const dy = Math.abs(y1 - y0) * 111;
  return Math.max(dx, dy);
}

function autoRegions(place: Place): Region[] {
  const [x0, y0, x1, y1] = focusBBox(place);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const km = Math.max(25, Math.min(160, spanKm(place) * 0.18));
  const belt = (id: string, name: string, lat: number, lon: number, dL: number, dW: number, dI: number, kind: RegionKind): Region => ({
    id: `${place.iso}:${id}`,
    iso: place.iso,
    name,
    kind,
    lat,
    lon,
    km,
    dL,
    dW,
    dI,
    note: "A modeled belt. Named cities are used where the public record is rich; elsewhere Meridian splits the territory into clear zones.",
    named: false,
  });
  if (spanKm(place) < 180 || place.pop < 400000) {
    return [belt("core", `${place.name} core`, cy, cx, 0, 2, 1, "capital")];
  }
  const dy = (y1 - y0) * 0.22;
  return [
    belt("north", `${place.name} — north`, cy + dy, cx, 1, 0, 0, "interior"),
    belt("center", `${place.name} — center`, cy, cx, 0, 3, 2, "metro"),
    belt("south", `${place.name} — south`, cy - dy, cx, 2, -1, 0, "coast"),
  ];
}

const ALL = new Map<string, Region[]>();
for (const place of PLACES) {
  ALL.set(place.iso, NAMED_BY_ISO.get(place.iso) ?? autoRegions(place));
}

export function regionsFor(iso: string): Region[] {
  return ALL.get(iso) ?? [];
}

let cached: Region[] | null = null;
export function allRegions(): Region[] {
  if (!cached) cached = PLACES.flatMap((place) => regionsFor(place.iso));
  return cached;
}

export function regionById(id: string): Region | undefined {
  const iso = id.split(":")[0];
  return regionsFor(iso).find((region) => region.id === id);
}

export function circleRing(lon: number, lat: number, km: number): [number, number][] {
  const ring: [number, number][] = [];
  const d = km / 6371;
  const lat1 = (lat * Math.PI) / 180;
  const lon1 = (lon * Math.PI) / 180;
  for (let i = 0; i <= 36; i++) {
    const bearing = (i / 36) * Math.PI * 2;
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(bearing));
    const lon2 =
      lon1 +
      Math.atan2(
        Math.sin(bearing) * Math.sin(d) * Math.cos(lat1),
        Math.cos(d) - Math.sin(lat1) * Math.sin(lat2),
      );
    let deg = (lon2 * 180) / Math.PI;
    if (deg > 180) deg -= 360;
    if (deg < -180) deg += 360;
    ring.push([deg, (lat2 * 180) / Math.PI]);
  }
  return ring;
}
