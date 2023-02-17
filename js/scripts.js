document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();

    function fetchUsers() {
        const usersUrl = 'https://randomuser.me/api/?results=10';
        fetch(usersUrl)
            .then((response) => response.json())
            .then((data) => renderContent(data.results))
            .catch((err) => console.log(err));
    };


    function renderContent(arr) {

        // Render cards
        console.log(arr);
        function renderCard(arr) {
            for (let i=0; i < arr.length; i++) {
                let card = document.createElement('div');
                card.className = "grid_card";
                card.innerHTML = "<div class=\"card_name\">" + arr[i].name.first + " " + arr[i].name.last + "</div>\n" +
                    "                <img src=\"" + arr[i].picture.large + "\">\n" +
                    "                <div class=\"card_old\">"+ arr[i].dob.age +" years old</div>\n" +
                    "                <div class=\"card_contact\">\n" +
                    "                    <p><i class=\"fa-solid fa-phone\"></i> "+ arr[i].phone +"</p>\n" +
                    "                    <p><i class=\"fa-regular fa-envelope\"></i> "+ arr[i].email +"</p>\n" +
                    "                    <p><i class=\"fa-regular fa-building\"></i> "+ arr[i].location.country +"</p>\n" +
                    "                </div>\n";
                cardList.append(card);
            }
        }
        renderCard(arr);

        // Search
        document.getElementById("inputSearch").addEventListener("input", searchByInput);
        document.getElementById("inputSearchMobile").addEventListener("input", searchByInput);
        function searchByInput(btnInput) {
            document.getElementById("genderAll").checked = true;

            renderCard(arr);
            let searchRes = document.getElementById("inputSearchMobile").value;
            if (document.getElementById("inputSearch").value === "") {
                searchRes = document.getElementById("inputSearchMobile").value;
            }
            else if (document.getElementById("inputSearchMobile").value === "") {
                searchRes = document.getElementById("inputSearch").value;
            }

            let resArr = [];
            for (let i=0; i<arr.length; i++) {
                if((arr[i].name.first.toLowerCase().search(searchRes.toLowerCase()) != -1) ||
                    (arr[i].name.last.toLowerCase().search(searchRes.toLowerCase()) != -1) ||
                    (arr[i].dob.age.toString().search(searchRes.toString()) != -1) ||
                    (arr[i].phone.search(searchRes) != -1) ||
                    (arr[i].email.toLowerCase().search(searchRes.toLowerCase()) != -1)){
                    resArr.push(arr[i])
                }
            }
            let cardBlock = document.querySelectorAll('.grid_card');
            cardBlock.forEach( e => e.remove() );
            renderCard(resArr);
        }

        // Sort by name
        document.getElementById("filterNameUp").addEventListener("click", sortByNameUp);
        document.getElementById("filterNameUpMobile").addEventListener("click", sortByNameUp);
        function sortByNameUp() {
            let resArr = arr.sort(function(a, b){
                var nameA=a.name.first.toLowerCase(),
                    nameB=b.name.first.toLowerCase()
                console.log(nameA)
                if (nameA < nameB)
                    return -1
                if (nameA > nameB)
                    return 1
                return 0
            });
            // remove previous list
            let cardBlock = document.querySelectorAll('.grid_card');
            cardBlock.forEach( e => e.remove() );
            renderCard(resArr);
        }

        document.getElementById("filterNameDown").addEventListener("click", sortByNameDown);
        document.getElementById("filterNameDownMobile").addEventListener("click", sortByNameDown);
        function sortByNameDown() {
            let resArr = arr.sort(function(a, b){
                var nameA=a.name.first.toLowerCase(),
                    nameB=b.name.first.toLowerCase()
                console.log(nameA)
                if (nameA > nameB)
                    return -1
                if (nameA < nameB)
                    return 1
                return 0
            });
            // remove previous list
            let cardBlock = document.querySelectorAll('.grid_card');
            cardBlock.forEach( e => e.remove() );
            renderCard(resArr);
        }

        // Sort by age
        document.getElementById("filterAgeUp").addEventListener("click", sortByAgeUp);
        document.getElementById("filterAgeUpMobile").addEventListener("click", sortByAgeUp);
        function sortByAgeUp() {
            let resArr = arr.sort(function(a, b){
                return a.dob.age-b.dob.age
            });
            // remove previous list
            let cardBlock = document.querySelectorAll('.grid_card');
            cardBlock.forEach( e => e.remove() );
            renderCard(resArr);
        }

        document.getElementById("filterAgeDown").addEventListener("click", sortByAgeDown);
        document.getElementById("filterAgeDownMobile").addEventListener("click", sortByAgeDown);
        function sortByAgeDown() {
            let resArr = arr.sort(function(a, b){
                return b.dob.age-a.dob.age
            });
            // remove previous list
            let cardBlock = document.querySelectorAll('.grid_card');
            cardBlock.forEach( e => e.remove() );
            renderCard(resArr);
        }

        // Filter by sex
        document.getElementById("genderAll").addEventListener("click", showAll);
        document.getElementById("genderAllMobile").addEventListener("click", showAll);
        function showAll() {
            let resArr = [];
            // searchByInput("All");
            for (let i=0; i < arr.length; i++) {
                if (arr[i].gender === "male" || arr[i].gender === "female") {
                    resArr.push(arr[i])
                }
            }
            // remove previous list
            let cardBlock = document.querySelectorAll('.grid_card');
            cardBlock.forEach( e => e.remove() );
            renderCard(resArr);
        }

        document.getElementById("genderMan").addEventListener("click", showMan);
        document.getElementById("genderManMobile").addEventListener("click", showMan);
        function showMan() {
            let resArr = [];
            // searchByInput("All");
            for (let i=0; i < arr.length; i++) {
                if (arr[i].gender === "male") {
                    resArr.push(arr[i])
                }
            }
            // remove previous list
            let cardBlock = document.querySelectorAll('.grid_card');
            cardBlock.forEach( e => e.remove() );
            renderCard(resArr);
        }

        document.getElementById("genderWoman").addEventListener("click", showWoman);
        document.getElementById("genderWomanMobile").addEventListener("click", showWoman);
        function showWoman() {
            let resArr = [];
            // searchByInput("All");
            for (let i=0; i < arr.length; i++) {
                if (arr[i].gender === "female") {
                    resArr.push(arr[i])
                }
            }

            // remove previous list
            let cardBlock = document.querySelectorAll('.grid_card');
            cardBlock.forEach( e => e.remove() );
            renderCard(resArr);
        }

        // Reset
        document.getElementById("reset").addEventListener("click", reset);
        document.getElementById("resetMobile").addEventListener("click", reset);
        function reset() {
            document.getElementById("inputSearch").value = "";
            radiobtnAll = document.getElementById("genderAll");
            radiobtnAll.checked = true;
            // remove previous list
            let cardBlock = document.querySelectorAll('.grid_card');
            cardBlock.forEach( e => e.remove() );
            renderCard(arr);
        }

        // New list
        document.getElementById("newList").addEventListener("click", refresh);
        document.getElementById("newListMobile").addEventListener("click", refresh);
        function refresh() {
            location.reload();
        }
    }

    // show div on click (mobile)
    let choiceButton = document.querySelectorAll(".choiceButton");
    for (let i=0; i<choiceButton.length; i++) {
        choiceButton[i].addEventListener('click', e => {
            let thisChoiceBlock = e.target.nextElementSibling.classList;
            for (let j=0; j<choiceButton.length; j++) {
                if (choiceButton[j] !== e.target){
                    choiceButton[j].nextElementSibling.classList.remove('dBlock');
                }
            }
            thisChoiceBlock.toggle("dBlock");
        })
    }

    let searchInput = document.getElementById("searchButtonMobile");
    searchInput.addEventListener("click", openSearch);
    let searchButton = document.getElementById('inputSearchMobile');
    function openSearch() {
        if (!searchButton.classList.contains('searchMobileOpen')) {
            searchButton.classList.add('searchMobileOpen');
        }
    }

});







