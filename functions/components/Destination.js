class Destination{
    constructor(displayName, travelTime){
        this.displayName = displayName;
        this.travelTime = Math.round(travelTime / 60);
    }
    toMarkdown(){
        return `| ${this.displayName} | ${this.travelTime} mins |\n`
    }
}

module.exports = {Destination}