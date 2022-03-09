
export default class extends require('./Abstract') {
    constructor() {
        super("Request");

    }

    async getHtml() {
        return `
            <div class="request-section">
                <h1>THIS IS REQUEST SECTION</h1>
            </div>
        `;
    }
}