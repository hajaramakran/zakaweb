    document.addEventListener('DOMContentLoaded', function() {
        const m3uUrl = 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8';
        const groupsSelector = document.getElementById('groups-selector');
        const channelsListContainer = document.getElementById('channels-list-container');
        const loader = document.getElementById('loader');

        let channelsData = {}; // Object to store channels grouped by category

        // Function to show the loader
        function showLoader() {
            loader.classList.remove('loader-hidden');
            // If you have a spinner, make sure it's visible here
        }

        // Function to hide the loader
        function hideLoader() {
            loader.classList.add('loader-hidden');
        }

        // Function to fetch and parse M3U data
        async function fetchAndParseM3U() {
            showLoader();
            try {
                const response = await fetch(m3uUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();
                parseM3U(text);
                hideLoader();
            } catch (error) {
                console.error("Error fetching or parsing M3U:", error);
                channelsListContainer.innerHTML = '<p style="color: red; text-align: center;">Error loading channels. Please try again later.</p>';
                hideLoader();
            }
        }

        // Function to parse M3U content
        function parseM3U(m3uContent) {
            const lines = m3uContent.split('\n');
            let currentGroup = '';

            // Clear previous data
            channelsData = {};
            groupsSelector.innerHTML = '<option value="">Select a group</option>'; // Reset selector

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                if (line.startsWith('#EXTINF:')) {
                    const groupMatch = line.match(/group-title="([^"]*)"/);
                    const nameMatch = line.match(/,(.*)$/);

                    if (groupMatch && nameMatch) {
                        currentGroup = groupMatch[1].trim();
                        const channelName = nameMatch[1].trim();

                        if (!channelsData[currentGroup]) {
                            channelsData[currentGroup] = [];
                            // Add group to selector if it's new
                            const option = document.createElement('option');
                            option.value = currentGroup;
                            option.textContent = currentGroup;
                            groupsSelector.appendChild(option);
                        }
                        channelsData[currentGroup].push(channelName);
                    }
                }
            }

            // Sort group options alphabetically
            const sortedGroupNames = Array.from(Object.keys(channelsData)).sort((a, b) => a.localeCompare(b));
            groupsSelector.innerHTML = '<option value="">Select a group</option>'; // Reset again
            sortedGroupNames.forEach(groupName => {
                const option = document.createElement('option');
                option.value = groupName;
                option.textContent = groupName;
                groupsSelector.appendChild(option);
            });

            // Display channels for the first group by default if available
            if (sortedGroupNames.length > 0) {
                groupsSelector.value = sortedGroupNames[0]; // Select the first group
                displayChannels(sortedGroupNames[0]);
            } else {
                channelsListContainer.innerHTML = '<p style="text-align: center;">No channels found.</p>';
            }
        }

        // Function to display channels for a selected group
        function displayChannels(groupName) {
            channelsListContainer.innerHTML = ''; // Clear previous channels
            if (channelsData[groupName] && channelsData[groupName].length > 0) {
                channelsData[groupName].forEach(channelName => {
                    const colDiv = document.createElement('div');
                    colDiv.classList.add('col', 'col-12', 'col-md-6');

                    const lsItemDiv = document.createElement('div');
                    lsItemDiv.classList.add('ls-item', 'd-flex', 'align-items-center');

                    const crcDiv = document.createElement('div');
                    crcDiv.classList.add('crc');

                    const pTag = document.createElement('p');
                    pTag.textContent = channelName;

                    lsItemDiv.appendChild(crcDiv);
                    lsItemDiv.appendChild(pTag);
                    colDiv.appendChild(lsItemDiv);
                    channelsListContainer.appendChild(colDiv);
                });
            } else {
                channelsListContainer.innerHTML = '<p style="text-align: center;">No channels available for this group.</p>';
            }
        }

        // Event listener for group selection change
        groupsSelector.addEventListener('change', function() {
            const selectedGroup = this.value;
            if (selectedGroup) {
                displayChannels(selectedGroup);
            } else {
                channelsListContainer.innerHTML = '<p style="text-align: center;">Please select a group.</p>';
            }
        });

        // Initial fetch of M3U data when the page loads
        fetchAndParseM3U();
    });
