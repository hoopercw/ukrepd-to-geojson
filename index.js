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
    cast: function (value, context) {
      if (context.column === 'No. of Turbines') {
        return parseInt(`${value}`)
      } else if (context.column === 'Installed Capacity (MWelec)') {
        return parseFloat(`${value}`)
      } else if (context.column === 'RO Banding (ROC/MWh)') {
        return parseFloat(`${value}`)
      } else if (context.column === 'FiT Tariff (p/kWh)') {
        return parseFloat(`${value}`)
      } else if (context.column === 'CfD Capacity (MW)') {
        return parseFloat(`${value}`)
      } else if (context.column === 'Turbine Capacity (MW)') {
        return parseFloat(`${value}`)
      } else if (context.column === 'Height of Turbines (m)') {
        return parseFloat(`${value}`)
      } else return `${value}`
    },
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
