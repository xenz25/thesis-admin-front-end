const sdNavItems = Array.from(document.getElementsByClassName("sd-nav-item"));

// came from server
const sdNavPathList = {
    "sd-request": "/",
    "sd-approval": "approval",
    "sd-create": "create",
    "sd-settings": "settings",
    "sd-logout": "logout"
}
// came from server

const navigateTo = (state, pathName) => {
    history.pushState(state, null, pathName);
    router(state.id);
}

const logOut = () => {
    alert("You are about to logged out.");
}

// this function should request on server for pages
const router = async (navItemID) => {
    if (location.pathname === `/${sdNavPathList[sdNavItems[sdNavItems.length - 1].id]}`) return;

    const routes = [
        {
            path: "/", view: () => {
                return `
            <div class="request-section">
                <h1>THIS IS REQUEST SECTION</h1>
            </div>
        `
            }
        },
        {
            path: "/approval", view: () => {
                return `
        <div class="approval-section">
            <h1>THIS IS APPROVAL SECTION</h1>
        </div>
    `
            }
        },
        {
            path: "/create", view: () => {
                return `
        <div class="create-section">
            <h1>THIS IS CREATE SECTION</h1>
        </div>
    `
            }
        },
        {
            path: "/settings", view: () => {
                return `
        <div class="settings-section">
            <h1>THIS IS SETTINGS SECTION</h1>
        </div>
    ` }
        },
        { path: "/logout", view: () => logOut() } // <- probably not required
    ];

    var matches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    var match = matches.find(item => item.isMatch);


    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    

    document.querySelector("main .container").innerHTML = await match.route.view();
    setActive(navItemID);
};

const getIdSTateObject = (id) => {
    if (id === null) return;
    return { id: `${id}` };
}

const setActive = (id) => {
    if (id === "sd-logout") return;
    if (id == "sd-") id = "sd-request";
    sdNavItems.forEach(element => {
        element.classList.toggle("active", element.id === id);
    });
};

document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener("popstate", (e) => {
        router(e.state === null ? sdNavItems[0].id : e.state.id);
    });

    window.addEventListener("load", e => {
        router(`sd-${String(e.target.location.pathname).substring(1)}`); // <- buggy 
    });

    sdNavItems.forEach((item) => {
        item.addEventListener('click', e => {
            if (item.id === "sd-logout") logOut()
            else {
                navigateTo(getIdSTateObject(item.id), sdNavPathList[item.id])
            }
        });
    });
});



