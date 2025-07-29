// apps.js
document.addEventListener('DOMContentLoaded', function() {
    const appsContainer = document.querySelector('.col-lg-9');
    
    // Remove existing content if any
    while (appsContainer.firstChild) {
        appsContainer.removeChild(appsContainer.firstChild);
    }

    // Create apps grid container
    const appsGrid = document.createElement('div');
    appsGrid.className = 'apps-grid row';
    
    // Sample IPTV applications data
    const iptvApps = [
        {
            name: "Smart IPTV",
            logo: "images/app1.jpg",
            description: "Application populaire pour Smart TV (Samsung, LG, etc.)",
            downloads: {
                windows: "#",
                android: "#",
                ios: "#",
                mac: "#"
            },
            rating: 4.5
        },
        {
            name: "IPTV Smarters Pro",
            logo: "images/app2.jpg",
            description: "Application complète avec support VOD et série TV",
            downloads: {
                windows: "#",
                android: "#",
                ios: "#"
            },
            rating: 4.7
        },
        {
            name: "TiviMate",
            logo: "images/app3.jpg",
            description: "Lecteur IPTV premium pour Android TV",
            downloads: {
                android: "#"
            },
            rating: 4.8
        },
        {
            name: "Perfect Player",
            logo: "images/app4.jpg",
            description: "Lecteur IPTV pour Android et Firestick",
            downloads: {
                android: "#",
                firestick: "#"
            },
            rating: 4.3
        },
        {
            name: "Kodi",
            logo: "images/app5.jpg",
            description: "Media center avec support IPTV via addons",
            downloads: {
                windows: "#",
                android: "#",
                ios: "#",
                mac: "#",
                linux: "#"
            },
            rating: 4.6
        },
        {
            name: "GSE Smart IPTV",
            logo: "images/app6.jpg",
            description: "Lecteur IPTV multiplateforme",
            downloads: {
                android: "#",
                ios: "#"
            },
            rating: 4.4
        }
    ];

    // Create app cards
    iptvApps.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'col-md-6 col-lg-4 mb-4 app-card';
        
        appCard.innerHTML = `
            <div class="card h-100 shadow-sm border-0 rounded-lg overflow-hidden">
                <div class="card-header bg-dark text-white py-3">
                    <div class="d-flex align-items-center">
                        <img src="${app.logo}" alt="${app.name}" class="app-logo mr-3">
                        <h5 class="mb-0">${app.name}</h5>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">${app.description}</p>
                    <div class="rating mb-3">
                        ${renderStars(app.rating)}
                        <span class="ml-2">${app.rating}/5</span>
                    </div>
                </div>
                <div class="card-footer bg-light">
                    <div class="dropdown">
                        <button class="btn btn-primary btn-block dropdown-toggle" type="button" id="dropdown-${app.name.replace(/\s+/g, '-')}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Télécharger
                        </button>
                        <div class="dropdown-menu w-100" aria-labelledby="dropdown-${app.name.replace(/\s+/g, '-')}">
                            ${renderDownloadLinks(app.downloads)}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        appsGrid.appendChild(appCard);
    });

    // Add the grid to the container
    appsContainer.appendChild(appsGrid);

    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
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

function renderDownloadLinks(downloads) {
    let links = '';
    const platforms = {
        windows: '<i class="zmdi zmdi-windows mr-2"></i> Windows',
        android: '<i class="zmdi zmdi-android mr-2"></i> Android',
        ios: '<i class="zmdi zmdi-apple mr-2"></i> iOS',
        mac: '<i class="zmdi zmdi-apple mr-2"></i> MacOS',
        linux: '<i class="zmdi zmdi-linux mr-2"></i> Linux',
        firestick: '<i class="zmdi zmdi-amazon mr-2"></i> Firestick'
    };
    
    for (const [platform, url] of Object.entries(downloads)) {
        links += `<a class="dropdown-item" href="${url}">${platforms[platform] || platform}</a>`;
    }
    
    return links;
}
