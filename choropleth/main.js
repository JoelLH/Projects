// import * as topojson from 'topojson-client';

const width = 1000;
const height = 700;

let counties = '';
let states = '';
let educationData = "";


const svg = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

const ranges = [12,24,36,48,75];

const legend = d3.select('body').append('svg')
                .attr('width', 170)
                .attr('height', 50)
                .attr('class', "legend")
                .attr('id', 'legend');

legend.selectAll('rect').data(ranges).enter()
        .append('rect')
        .attr('width', 32)
        .attr('height', 32)
        .attr('x', (d, i) => 32 * i)
        .attr('fill',(d)=>{
            return d <= 12 ?  '#97DFFC':
                            d <= 24 ? '#858AE3' :
                            d <= 36 ? '#613DC1' :
                            d <= 48 ? '#4E148C' : '#2C0735';
        })
        .attr('class','range')
        
legend.selectAll('text').data(ranges).enter()
        .append('text')
        .text(d=> "<" + d)
        .attr('x', (d, i) => 32 * i + 5)
        .attr('y', 44)

const tooltip = d3.select('.tooltip');

tooltip.append('span')
        .attr('id', 'info')

const path = d3.geoPath();



d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
    .then(data=>{

        states = topojson.feature(data, data.objects.states).features;
        counties = topojson.feature(data, data.objects.counties).features;

        d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
            .then(data =>{

                educationData = data

                svg.selectAll('path').data(states).enter().append('path').attr('class', 'state').attr('d', path)
                
                svg.selectAll('path .county').data(counties).enter().append('path').attr('class', 'county').attr('d', path).attr('fill', (countyItem)=>{
                    
                    let county = educationData.filter(d => d['fips']== countyItem['id'])[0]

                    let percentage = county['bachelorsOrHigher']
                    return percentage < 12 ?  '#97DFFC':
                            percentage < 24 ? '#858AE3' :
                            percentage < 36 ? '#613DC1' :
                            percentage < 48 ? '#4E148C' : '#2C0735';
                }).attr('data-fips', (countyItem)=>{

                    let county = educationData.filter(d => d['fips']== countyItem['id'])[0];
                    return county.fips
                }).attr('data-education', (countyItem)=>{

                    let county = educationData.filter(d => d['fips']== countyItem['id'])[0];
                    
                    return county.bachelorsOrHigher
                })
                .attr('data-state', (countyItem)=>{

                    let county = educationData.filter(d => d['fips']== countyItem['id'])[0];
                    
                    return county.state
                }).attr('data-areaName', (countyItem)=>{

                    let county = educationData.filter(d => d['fips']== countyItem['id'])[0];
                    
                    return county.area_name
                })

                svg.selectAll('.county').on('mouseover', (e)=>{
                    let education = e.target.dataset.education;
                    let state = e.target.dataset.state;
                    let area = e.target.dataset.areaName;

                    let mouseX = e.clientX
                    let mouseY = e.clientY

                    tooltip.style('left', 10 + mouseX + 'px')
                            .style('top', 10 + mouseY + 'px')
                            .style('display', 'block')
                    
                    tooltip.select('#info').html(`${area} (${state}), bachelorsOrHigher: ${education}%`);

                    tooltip.attr('data-education', education);
                    
                })
                
                svg.selectAll('.county').on('mouseout', (e)=>{
                    tooltip.style('display', 'none')
                })
            })
    })