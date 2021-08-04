const fs = require('fs')
const parse = require('csv-parse/lib/sync')
const GeoJSON = require('geojson')
const gbify = require('gbify-geojson')

const parseREPD = () => {
  const csv = fs.readFileSync(
    './files/renewable-energy-planning-database-q2-june-2021.csv'
  )
  const json = parse(csv, {
    columns: true,
    from_line: 1,
  })
  const geojson_OSGB = GeoJSON.parse(json, {
    Point: ['Y-coordinate', 'X-coordinate'],
  })
  const geojson_WGS84 = gbify.toWGS84(geojson_OSGB)
  fs.writeFileSync(
    './files/renewable-energy-planning-database-q2-june-2021.geo.json',
    JSON.stringify(geojson_WGS84)
  )
}

parseREPD()
