var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?directions=asc";

    fetch(apiUrl).then(function(response) {
        // if response was sucessful
        if (response.ok) {
            response.json().then(function(data) {

                // pass response data to dom function
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "This Repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create a link element to take the users to the issue on github
        
        var issueEl = document.createElement("a")
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target","_blank");
        
        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        
        // append container
        issueEl.appendChild(titleEl);
        
        // create type element
        var typeEl = document.createElement("span");
        
        // check if issue is n actual issue or a pull request
        if (issues[i].pull_repuest) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(issue)";
        }
        // apend to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl)
    }
    
}

var displayWarning = function(repo) {
    // add text to the warning container
    limitWarningEl.textContent = "To see mare than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append warning container
    limitWarningEl.appendChild(linkEl);
}; 

getRepoIssues("facebook/react");
