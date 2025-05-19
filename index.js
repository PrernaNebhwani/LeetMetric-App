document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");


    //return true or false based on regex
    function validateUsername(username) {
        // if(username.trim() === '') {
        //   alert("Username should not be empty");
        
        // }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }
    async function fetchUserdetails(username){
      const url=`https://leetcode-stats-api.herokuapp.com/${username}`
      try{
        searchButton.textContent="Searching...";
        searchButton.disabled=true;
        statsContainer.style.display='none';
        const response=await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch user details");
        }
        const parsedData=await response.json();
        console.log("Logging data: ",parsedData);

        displayUserData(parsedData);
        statsContainer.style.display='block';
      }
      catch(error){
        statsContainer.innerHTML=`<p>${error}</p>`
        statsContainer.style.display='block';
      }
      finally{
         searchButton.textContent = "Search";
         searchButton.disabled = false;
      }
    }
    function updateProgress(solved,total,label,circle){
     const progressDegree=(solved/total)*100;
     circle.style.setProperty("--progress-degree", `${progressDegree}%`);
     label.textContent=`${solved}/${total}`
    }
    function displayUserData(parsedData){
       const totalQues=parsedData.totalQuestions;
       const totalEasyQues=parsedData.totalEasy;
       const totalMediumQues=parsedData.totalMedium;
       const totalHardQues=parsedData.totalHard;

       const solvedTotalQues=parsedData.totalSolved;
       const solvedEasy=parsedData.easySolved;
       const solvedMedium=parsedData.mediumSolved;
       const solvedHard=parsedData.hardSolved;
       
       updateProgress(solvedEasy,totalEasyQues,easyLabel,easyProgressCircle);
       updateProgress(solvedMedium,totalMediumQues,mediumLabel,mediumProgressCircle);
       updateProgress(solvedHard,totalHardQues,hardLabel,hardProgressCircle);

      const cardsData=[
        {label: "Overall Submissions:", value:parsedData.totalSolved},
        {label: "Overall Questions:", value:parsedData.totalQuestions},
        {label: "Ranking:", value:parsedData.ranking},
        {label: "Acceptance-rate:", value:parsedData.acceptanceRate}
      ];
      console.log("card's data", cardsData);
      
      cardStatsContainer.innerHTML=cardsData.map(
        data => 
          `<div class="card">
            <h4>${data.label}</h4>
            <p>${data.value}</p>
          </div>`
      ).join('')


    }
    searchButton.addEventListener('click',function(){
        const username=usernameInput.Value;
        console.log("logging in: ",username);
        if(validateUsername(username)){
            fetchUserdetails(username)
        }
    })

})