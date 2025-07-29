document.addEventListener('DOMContentLoaded', function () {
    const appsContainer = document.querySelector('.apps-grid');

    // Clear any existing content
    while (appsContainer.firstChild) {
        appsContainer.removeChild(appsContainer.firstChild);
    }

    // Sample data
    const iptvApps = [
        {
            name: "Smart IPTV",
            logo: "images/app1.jpg",
            description: "Application populaire pour Smart TV (Samsung, LG, etc.)",
            downloads: {
                android: "#"
            },
            rating: 4.5
        },
        {
            name: "IPTV Smarters Pro",
            logo: "images/app1.jpg",
            description: "Application complète avec support VOD et série TV",
            downloads: {
                android: "#"
            },
            rating: 4.7
        },
        {
            name: "TiviMate",
            logo: "images/app1.jpg",
            description: "Lecteur IPTV premium pour Android TV",
            downloads: {
                android: "#"
            },
            rating: 4.8
        },
        {
            name: "Perfect Player",
            logo: "images/app1.jpg",
            description: "Lecteur IPTV pour Android et Firestick",
            downloads: {
                android: "#"
            },
            rating: 4.3
        },
        {
            name: "Kodi",
            logo: "images/app1.jpg",
            description: "Media center avec support IPTV via addons",
            downloads: {
                android: "#"
            },
            rating: 4.6
        },
        {
            name: "GSE Smart IPTV",
            logo: "images/app1.jpg",
            description: "Lecteur IPTV multiplateforme",
            downloads: {
                android: "#"
            },
            rating: 4.4
        }
    ];

    iptvApps.forEach((app, index) => {
        const downloadLink = Object.values(app.downloads)[0] || "#";

        const appCard = document.createElement('div');
        appCard.className = `col-md-6 col-lg-4 mb-4 app-card`;

        appCard.innerHTML = `
            <a href="${downloadLink}" class="text-decoration-none text-dark">
                <div class="card h-100 text-center p-3">
                    <img src="${app.logo}" alt="${app.name}" class="img-fluid rounded mb-3" style="width: 100%; height: 200px; object-fit: cover; border-radius: 15px;">
                    <h5 class="font-weight-bold mb-2">${app.name}</h5>
                    <p class="text-muted mb-2">${app.description}</p>
                    <div class="rating">
                        ${renderStars(app.rating)}
                        <span class="ml-1">${app.rating}/5</span>
                    </div>
                </div>
            </a>
        `;

        appsContainer.appendChild(appCard);
    });
});

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="zmdi zmdi-star text-warning"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="zmdi zmdi-star-half text-warning"></i>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="zmdi zmdi-star-outline text-warning"></i>';
    }

    return stars;
}
