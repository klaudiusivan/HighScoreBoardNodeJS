// script.js
const leaderboardContainer = document.getElementById('leaderboard');

// Fetch leaderboard data from backend API
fetch('/api/players/leaderboard')
  .then(response => response.json())
  .then(data => {
    // Process and format leaderboard data
    const leaderboard = data.leaderboard;

    // Clear previous leaderboard content
    leaderboardContainer.innerHTML = '';

    // Render leaderboard
    leaderboard.forEach((player, index) => {
      const playerRow = document.createElement('div');
      playerRow.classList.add('player-row');
      playerRow.innerHTML = `
        <span class="rank">${index + 1}</span>
        <span class="player-name">${player.playerName}</span>
        <span class="score">${player.score}</span>
      `;
      leaderboardContainer.appendChild(playerRow);
    });
  })
  .catch(error => console.error('Error fetching leaderboard data:', error));
