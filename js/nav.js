// Load the nav.html content
export function loadNav() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("navbar").innerHTML = xhr.responseText;
            }
        };
        xhr.open("GET", "nav.html", true);
        xhr.send();
}

loadNav();