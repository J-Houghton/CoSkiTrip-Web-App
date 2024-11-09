import { Route } from '../components/Route.js';
import { Subroute } from '../components/Subroute.js';
import { Destination } from '../components/Destination.js';
import { Incident } from '../components/Incident.js'; 

export class DataProcessor {
    constructor(){
        this.filters = {
            routes: {
                "I-70": ["Westbound", "Eastbound"],
                "US-6": ["Westbound", "Eastbound"],
                "US-40": ["Westbound", "Eastbound"],
                "CO-9": ["Northbound", "Southbound"],
            },
            destinations: {
                "OpenTMS-TravelTime7685712394": {
                    "displayName":"DEN/C-470 to Tunnel",
                    "route":"I-70W"
                },
                "OpenTMS-TravelTime556483": {
                    "displayName":"Georgetown Chainup to Tunnel",
                    "route":"I-70W"
                },
                "OpenTMS-TravelTime551406": {
                    "displayName":"Frisco to DEN/C-470",
                    "route":"I-70E"
                },
                "OpenTMS-TravelTime548989": {
                    "displayName":"Silverthorne Chainup to Tunnel",
                    "route":"I-70E"
                }
            }
        }

        this.routes = {}

        // load placeholders for the filtered routes into this.routes
        for(let route in this.filters["routes"]){
            this.routes[route] = new Route(route);
          //  console.log("adding", route)
            for(let subroute of this.filters["routes"][route]){
                //console.log("adding", route, subroute)
                this.routes[route].addSubroute(new Subroute(subroute))
            }
        }
    }

    convertRouteDirectionToString(route){
        let direction = route.slice(route.length-1,route.length).toUpperCase()
        switch (direction) {
            case "S":
                return "Southbound"
            case "N":
                return "Northbound"
            case "E":
                return "Eastbound"
            case "W":
                return "Westbound"
            default:
                return null
        }
    }

    hasRoute(name){
        return Object.keys(this.routes).includes(name);
    }

    importDestinations(destinations){
        let destinationFilter = this.filters["destinations"];

        for(let destination of destinations){
            for (let filter in destinationFilter){
                if(destination['properties']['id'] === filter){
                    let route = destinationFilter[filter]["route"].slice(0, destinationFilter[filter]["route"].length-1) // cut off direction (N,E,S,W)

                    if(!this.hasRoute(route)){
                        this.routes[route] = new Route(route);
                    }
                    let routeObj = this.routes[route];

                    let direction = this.convertRouteDirectionToString(destinationFilter[filter]["route"])
                    
                    if(!routeObj.hasSubroute(direction)){
                        routeObj.addSubroute(new Subroute(direction));
                    }
                    
                    let destinationObj = new Destination(destinationFilter[filter].displayName, destination['properties']['travelTime'])
                    routeObj.getSubroute(direction).addDestination(destinationObj)
                }
            }
        }
    }

    importIncidents(incidents){

        let routeFilter = this.filters["routes"];
        // iterate through all current incidents and filter down to incidentRoutes
        for(let incident of incidents){
            // extract info from the incident
            let incidentRoute = incident['properties']['routeName'].toUpperCase();

            let impactsBothDirections = false;

            // Detect if the incident impacts both directions of travel (array incident['properties']['additionalImpacts'] contains a string "Impacts both directions")
            if(Object.keys(incident['properties']).includes("additionalImpacts")){
                for(let impact of incident['properties']['additionalImpacts']){
                    if(impact.toUpperCase() === "IMPACTS BOTH DIRECTIONS"){
                        impactsBothDirections = true;
                        break;
                    }
                }
            }

            // check all routeFilter routes against the current incidentRoute
            for(let route in routeFilter){
                if(incidentRoute.indexOf(route) !== -1){
                    if(!this.hasRoute(route)){
                        this.routes[route] = new Route(route)
                    }

                    let routeObj = this.routes[route];
                    let incidentObj = new Incident(incident);

                    console.log(JSON.stringify(incident))

                    if(impactsBothDirections){
                        routeObj.addGlobalIncident(incidentObj);
                    }
                    else{
                        let direction = this.convertRouteDirectionToString(incidentRoute);

                        if(!routeObj.hasSubroute(direction)){
                            routeObj.addSubroute(new Subroute(direction))
                        }
    
                        routeObj.getSubroute(direction).addIncident(incidentObj)
                    }
                    break;
                }
            }
        }
    }
} 