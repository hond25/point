// BroadcastChannelの設定
const scoreChannel = new BroadcastChannel('score-updates');

// スコアを更新する関数
function updateScore(teamNumber, points) {
    const scoreElement = document.getElementById(`score${teamNumber}`);
    const currentScore = parseInt(scoreElement.textContent);
    const newScore = currentScore + points;
    scoreElement.textContent = newScore;
    
    // スコアをローカルストレージに保存
    localStorage.setItem(`team${teamNumber}Score`, newScore.toString());
    
    // スコアの更新を通知
    scoreChannel.postMessage({
        type: 'score-update',
        team: teamNumber,
        score: newScore
    });
}

// スコアをリセットする関数
function resetScore(teamNumber) {
    const scoreElement = document.getElementById(`score${teamNumber}`);
    scoreElement.textContent = '0';
    
    // ローカルストレージのスコアもリセット
    localStorage.setItem(`team${teamNumber}Score`, '0');
    
    // リセットを通知
    scoreChannel.postMessage({
        type: 'score-reset',
        team: teamNumber
    });
}

// ページ読み込み時に保存されたスコアを復元
window.addEventListener('load', () => {
    for (let i = 1; i <= 4; i++) {
        const savedScore = localStorage.getItem(`team${i}Score`);
        if (savedScore !== null) {
            document.getElementById(`score${i}`).textContent = savedScore;
        }
    }
}); 