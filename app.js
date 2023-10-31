var runes
var runewords
var searchStats = true;

async function loadData() {
    res = await fetch("runes.json")
    runes = await res.json()

    res = await fetch("runewords.json")
    runewords = await res.json()

    processRunewords(false)
}

function processRunewords(search) {
    wrapper = document.getElementById("itemWrapper")
    wrapper.innerHTML = "";

    filteredRunewords = filterRunewords(search);

    filteredRunewords.forEach(item => {
        itemElem = document.createElement("div")
        itemElem.className = "item"
        
        nameElem = document.createElement("h2")
        nameElem.innerHTML = item.name

        typeElem = document.createElement("p")
        typeElem.className = "type"
        typeElem.innerHTML = item.type

        runeElem = document.createElement("p")
        runeElem.className = "runeword"
        runeElem.innerHTML = item.runes.join(" ")

        statsElem = document.createElement("ul")
        statsElem.className = "stats"
        item.stats.forEach(stat => {
            statElem = document.createElement("li")
            statElem.innerHTML = stat
            statsElem.append(statElem)
        })

        costElem = document.createElement("ul")
        costElem.className = "cost"
        costLow = 0
        costMid = 0
        costHigh = 0
        item.runes.forEach(runeType => {
            rune = runes[runeType.toLowerCase()]
            switch(rune.rank) {
                case "Low":
                    costLow += parseInt(rune.cost)
                    break
                case "Mid":
                    costMid += parseInt(rune.cost)
                    break
                case "High":
                    costHigh += parseInt(rune.cost)
                    break
            }
        })

        if(costLow > 0) {
            lowElem = document.createElement("li")
            lowElem.innerHTML = "Low: " + "<span class=\"cost\">" + costLow + "</span>"
            costElem.append(lowElem)
        }
        if(costMid > 0) {
            midElem = document.createElement("li")
            midElem.innerHTML = "Mid: " + "<span class=\"cost\">" + costMid + "</span>"
            costElem.append(midElem)
        }
        if(costHigh > 0) {
            highElem = document.createElement("li")
            highElem.innerHTML = "High: " + "<span class=\"cost\">" + costHigh + "</span>"
            costElem.append(highElem)
        }
        
        itemElem.append(nameElem)
        itemElem.append(typeElem)
        itemElem.append(runeElem)
        itemElem.append(statsElem)

        itemElem.append(costElem)

        wrapper.append(itemElem)
    })
    
    
}

function filterRunewords(search) {
    if(search == false) return runewords
    return runewords.filter((runeword) => {
        if(runeword.name.toLowerCase().includes(search)) return true
        if(runeword.type.toLowerCase().includes(search)) return true
        if(searchStats) {
            if(runeword.stats.join("n").toLowerCase().includes(search)) return true
        }
    })
}

function doSearch(event) {
    event.preventDefault();
    processRunewords(document.getElementById("search").value.toLowerCase());
}

loadData()
document.getElementById("search").addEventListener("input", doSearch)
document.getElementById("searchForm").addEventListener("submit", (e) => {e.preventDefault()})
document.getElementById("searchStats").addEventListener("input", (e) => {searchStats = !searchStats; doSearch(e)})