class WasteCollectionApp {
    constructor(apiKey, options = {}) {
        this.apiKey = apiKey;
        this.clientId = this.generateClientId();
        this.bundeslandId = options.bundeslandId || null;
        this.landkreisId = options.landkreisId || null;
        this.kommuneId = options.kommuneId || null;
        this.bezirkId = options.bezirkId || null;
        this.strasseId = options.strasseId || null;
        this.hnrId = options.hnrId || null;
        this.baseUrl = "https://api.abfall.io";
        this.headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent": "Mozilla/5.0",
        };
    }

    // Generate unique client ID
    generateClientId() {
        return crypto.randomUUID();
    }

    // Helper method for making requests
    async request(endpoint, data = {}, method = "POST") {
        const url = `${this.baseUrl}/${endpoint}`;
        const params = new URLSearchParams({
            key: this.apiKey,
            client: this.clientId,
        });

        const options = {
            method: method,
            headers: this.headers,
        };

        if (method === "POST") {
            options.body = new URLSearchParams(data);
        }

        const response = await fetch(`${url}?${params.toString()}`, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${response.statusText} - ${errorText}`);
        }

        return await response.json();
    }

    // Initialize the connection
    async initConnection() {
        const data = {
            client: this.clientId,
            app_id: this.apiKey,
        };
        return await this.request("config.xml", data);
    }

    // Fetch Bundesländer
    async getBundeslaender() {
        const response = await this.request("bundesland/", {}, "GET");
        return response.map((item) => ({ id: item.id, name: item.name }));
    }

    // Fetch Landkreise
    async getLandkreise() {
        const data = { id_bundesland: this.bundeslandId };
        const response = await this.request("landkreis/", data);
        return response.map((item) => ({ id: item.id, name: item.name }));
    }

    // Fetch Kommunen
    async getKommunen() {
        const data = {
            id_bundesland: this.bundeslandId,
            id_landkreis: this.landkreisId,
        };
        const response = await this.request("kommune/", data);
        return response.map((item) => ({ id: item.id, name: item.name }));
    }

    // Fetch Bezirke (optional)
    async getBezirke() {
        const data = {
            id_bundesland: this.bundeslandId,
            id_landkreis: this.landkreisId,
            id_kommune: this.kommuneId,
        };
        const response = await this.request("bezirk/", data);
        return response.map((item) => ({ id: item.id, name: item.name }));
    }

    // Fetch Straßen
    async getStreets(search = "") {
        const data = {
            id_bundesland: this.bundeslandId,
            id_landkreis: this.landkreisId,
            id_kommune: this.kommuneId,
            id_bezirk: this.bezirkId,
            strasse_qry: search,
        };
        const response = await this.request("strasse/", data);
        return response.map((item) => ({ id: item.id, name: item.name }));
    }

    // Fetch house numbers (hnr)
    async getHouseNumbers() {
        const data = {
            id_landkreis: this.landkreisId,
            id_kommune: this.kommuneId,
            id_bezirk: this.bezirkId || "",
            id_strasse: this.strasseId,
        };
        const response = await this.request("hnr/", data);
        return response.map((item) => ({ id: item.id, name: item.name }));
    }

    // Fetch waste collection data
    async getCollections() {
        const data = {
            f_id_bundesland: this.bundeslandId,
            f_id_landkreis: this.landkreisId,
            f_id_kommune: this.kommuneId,
            f_id_bezirk: this.bezirkId || "",
            f_id_strasse: this.strasseId,
            f_hnr: this.hnrId || "",
        };

        const response = await this.request("abfallarten/", data);
        return response.map((item) => ({
            category: item.category,
            date: item.date,
        }));
    }

    // Generate calendar
    async generateCalendar() {
        await this.initConnection();
        return await this.getCollections();
    }
}
