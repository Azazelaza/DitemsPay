//const REQUEST_API_URL = "http://127.0.0.1:8000/api";
const REQUEST_API_URL = "https://api.hardcuino.com/api";
export const Call = async (
    endpoint,
    method = "GET",
    body = null,
    signed = true
) => {
    let url = `${REQUEST_API_URL}/${endpoint}`;

    const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
    });

    if (signed) {
        const token = localStorage.getItem("token");
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
    }

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };

    if (method === "GET") {
        if (body !== null) {
            url = `${url}?${body}`;
            delete options.body;
        }
    }

    const resp = await fetch(url, options);

    const result = await resp.json();

    result.status_code = resp.status;
    result.request_ok = resp.ok;

    return result;
};

export const CallWithFormData = async (
    endpoint,
    method = "GET",
    body = null,
    signed = true
) => {
    let url = `${REQUEST_API_URL}/${endpoint}`;

    const headers = new Headers({ Accept: "application/json" });

    if (signed) {
        const token = localStorage.getItem("token");
        if (token) {
            headers.append("Authorization", `${token}`);
        }
    }

    const options = {
        method,
        headers,
        body,
    };

    const resp = await fetch(url, options);

    const result = await resp.json();

    result.status_code = resp.status;
    result.request_ok = resp.ok;

    return result;
};

export const CallWithFormDataFile = async (
    endpoint,
    method = "GET",
    body = null,
    signed = true
) => {
    let url = `${REQUEST_API_URL}/${endpoint}`;

    const headers = new Headers({ Accept: "application/json" });

    if (signed) {
        const token = localStorage.getItem("token");
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
    }

    const options = {
        method,
        headers,
        body,
    };

    const resp = await fetch(url, options);

    const result = await resp.json();
    result.status_code = resp.status;
    result.request_ok = resp.ok;
    return result; 
};

export const cleanEmpty = (data) => {
    Object.entries(data).forEach(([key, value]) => {
        if (
            !value ||
            value.length === 0 ||
            (typeof value === "object" &&
                Object.entries(value).length === 0 &&
                !data[key].name)
        ) {
            if (typeof data[key] == "string") {
                data[key] = "";
            } else {
                delete data[key];
            }
        }
    });

    return data;
};

export const objectToFormData = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });

    return formData;
};