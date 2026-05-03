document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ask-form');
    const input = document.getElementById('user-query');
    const loading = document.getElementById('loading');
    const resultArea = document.getElementById('result-area');
    
    // Elements to update
    const userTypeTag = document.getElementById('user-type-tag');
    const intentTag = document.getElementById('intent-tag');
    const decisionStage = document.getElementById('decision-stage');
    const decisionSteps = document.getElementById('decision-steps');
    const decisionAdvice = document.getElementById('decision-advice');
    const aiContent = document.getElementById('ai-content');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const query = input.value.trim();
        if (!query) return;

        // Show loading, hide previous results
        loading.classList.remove('hidden');
        resultArea.classList.add('hidden');
        
        try {
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: query })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Render Context
            userTypeTag.textContent = `User Type: ${data.context.userType.replace('_', ' ')}`;
            intentTag.textContent = `Identified Intent: ${data.context.intent.replace('_', ' ')}`;
            
            // Render Decision
            decisionStage.textContent = data.decision.stage;
            
            decisionSteps.innerHTML = '';
            data.decision.baseSteps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                decisionSteps.appendChild(li);
            });

            if (data.decision.advice) {
                decisionAdvice.textContent = data.decision.advice;
                decisionAdvice.classList.remove('hidden');
            } else {
                decisionAdvice.classList.add('hidden');
            }

            // Render AI Explanation (Convert markdown-like to basic HTML if needed, or just format simply)
            // For safety and simplicity, we'll format newlines and bullet points.
            let formattedAI = data.explanation
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n- /g, '<br>• ');
            
            aiContent.innerHTML = `<p>${formattedAI}</p>`;

            // Show results
            loading.classList.add('hidden');
            resultArea.classList.remove('hidden');
            
            // Accessibility focus
            resultArea.focus();

        } catch (error) {
            console.error('Error:', error);
            alert("Sorry, there was an error processing your request. Please try again later.");
            loading.classList.add('hidden');
        }
    });
});
