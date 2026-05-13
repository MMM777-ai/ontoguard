// script.js

/*
 * Production-safe analytics helpers for OntoGuard.
 *
 * Current site uses Plausible. Google Analytics is optional and should not
 * produce console warnings when it is not installed.
 *
 * To enable local debug logs in the browser:
 *   localStorage.setItem("ONTOGUARD_ANALYTICS_DEBUG", "1")
 */
(function () {
    "use strict";

    var DEBUG_KEY = "ONTOGUARD_ANALYTICS_DEBUG";

    function isDebugEnabled() {
        try {
            return window.localStorage && window.localStorage.getItem(DEBUG_KEY) === "1";
        } catch (error) {
            return false;
        }
    }

    function debugLog(message, payload) {
        if (!isDebugEnabled()) return;
        if (payload !== undefined) {
            console.log("[OntoGuard analytics]", message, payload);
        } else {
            console.log("[OntoGuard analytics]", message);
        }
    }

    function safeText(value, fallback) {
        if (value === undefined || value === null) return fallback;
        return String(value).trim().slice(0, 160) || fallback;
    }

    function trackEvent(eventName, props) {
        var safeEventName = safeText(eventName, "Interaction");
        var safeProps = props && typeof props === "object" ? props : {};

        // Plausible is the currently installed analytics provider.
        if (typeof window.plausible === "function") {
            try {
                window.plausible(safeEventName, { props: safeProps });
                debugLog("Plausible event sent", { event: safeEventName, props: safeProps });
            } catch (error) {
                debugLog("Plausible event failed", error);
            }
        }

        // Google Analytics is optional. Do not warn when absent.
        if (typeof window.gtag === "function") {
            try {
                window.gtag("event", safeEventName.toLowerCase().replace(/\s+/g, "_"), {
                    event_category: safeProps.category || "Website",
                    event_label: safeProps.label || safeProps.resource || safeProps.action || safeEventName,
                    value: 1
                });
                debugLog("Google Analytics event sent", { event: safeEventName, props: safeProps });
            } catch (error) {
                debugLog("Google Analytics event failed", error);
            }
        }
    }

    window.trackDownload = function trackDownload(item) {
        var resource = safeText(item, "Unknown Resource");
        trackEvent("Download", {
            category: "Resource",
            resource: resource,
            label: resource
        });
    };

    window.trackClick = function trackClick(action) {
        var label = safeText(action, "Unknown Click");
        trackEvent("Click", {
            category: "Button",
            action: label,
            label: label
        });
    };

    document.addEventListener("DOMContentLoaded", function () {
        debugLog("script.js loaded");

        // Defensive: avoid runtime errors if these optional footer elements
        // are missing on a future page variant.
        var emailTarget = document.getElementById("email");
        if (emailTarget && !emailTarget.innerHTML.trim()) {
            emailTarget.innerHTML = '<a href="mailto:mark.starobinsky@ontoguard.ai">mark.starobinsky@ontoguard.ai</a>';
        }

        var contactNda = document.getElementById("contact-nda");
        if (contactNda && (!contactNda.getAttribute("href") || contactNda.getAttribute("href") === "#")) {
            contactNda.setAttribute("href", "mailto:mark.starobinsky@ontoguard.ai?subject=OntoGuard%20NDA%20access%20request");
        }
    });
})();