const newData = [];
const input = document.getElementById("searchByName");
const go = document.getElementById('go')
go.addEventListener("click", dataFilter)

// ---------заглушка для сортировки по имени.-----------
// const sort = document.getElementById('sort')
// sort.addEventListener("click", sortedRows)
// -----------------------------------------------------

fetch("fbi.json").then((response) => {
    return response.json()
}).then((data) => {
        newData.push(...data.items)
        dataTable(newData)
        dataStat(newData)
    })




function dataFilter() {
    let td, i,
        filter = input.value.toUpperCase().trim(),
        table = document.querySelectorAll("tbody"),
        tr = []
    
    for(i = 0; i < table.length; i+=1) {
        for (let a = 0; a < table[i].rows.length; a+=1) {
            tr.push(table[i].rows[a])
        }
    }

    for (i = 0; i < tr.length; i+=1) {
        td = tr[i].getElementsByTagName("td")[0] || tr[i].getElementsByTagName("th")[0]
        if (td) {
            if (td.innerHTML.toUpperCase().trim().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = 'none'
            }
        }
    }
}


const dataTable = (newData) => {newData.map ((item) => {
    const tbody = document.getElementById("tbody")
    const tr = document.createElement("tr")
    tr.innerHTML = ` 
        <td id="name">${item.title ? item.title : "нет информации"}</td>
        <td>${item.sex ? item.sex : "нет информации"}</td>
        <td>${item.nationality ? item.nationality : "нет информации"}</td>
        <td>${item.race ? item.race : "нет информации"}</td>
        <td>${item.status ? item.status : "нет информации"}</td>
        <td>${item.description ? item.description : "нет информации"}</td>
           <td>${item.warning_message ? item.warning_message : "нет информации"}</td>
           <td>${item.reward_text ? item.reward_text : "нет информации"}</td>

           <td><img src=${item.images[0].original ? item.images[0].original : "нет фото"}>
        </td>`
    tbody.appendChild(tr)
})}

const dataStat = (newData) => {
    const totalCaptured = newData.reduce((total, item) => {
        if (item.status === "captured") {
            total+=1
        }
        return total
    }, 0)
    const captured = document.getElementById("captured")
    captured.innerText = `Всего задержано: ${totalCaptured}`


    const totalBlack = newData.reduce((total, item) => {
        if (item.race === "black") {
            total+=1
        }
        return total
    }, 0)
    const black = document.getElementById("black")
    black.innerText = `Всего афроамериканцев: ${totalBlack}`

    
    const totalFemale = newData.reduce((total, item) => {
        if (item.sex === "Female") {
            total+=1
        }
        return total
    }, 0)
    const female = document.getElementById("female")
    female.innerText = `Всего женщин: ${totalFemale}`
}
   

