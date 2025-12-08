module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/page.tsx
__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Pathway-GEN-AI/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Pathway-GEN-AI/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Pathway-GEN-AI/node_modules/jspdf/dist/jspdf.node.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Pathway-GEN-AI/node_modules/html2canvas/dist/html2canvas.esm.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function HomePage() {
    // Required state variables
    const [brandName, setBrandName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [idea, setIdea] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [audience, setAudience] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tone, setTone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [industry, setIndustry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoLoading, setLogoLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showJson, setShowJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasGenerated, setHasGenerated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // "Multi-page" flow: input page vs results page with tabs
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("input");
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("overview");
    // this ref points to the logos section we’ll export to PDF
    const logoSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // --------------------------
    // Load from localStorage on mount
    // --------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const saved = undefined;
    }, []);
    // --------------------------
    // Save to localStorage whenever inputs or result change (with a trimmed result)
    // --------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const safeResult = undefined;
        const data = undefined;
    }, [
        brandName,
        idea,
        audience,
        tone,
        industry,
        result
    ]);
    // --------------------------
    // Confetti animation (simple CSS-based)
    // --------------------------
    const triggerConfetti = ()=>{
        if (!hasGenerated && result?.logos?.imageUrls?.length > 0) {
            setHasGenerated(true);
            if (typeof document === "undefined") return;
            const confetti = document.createElement("div");
            confetti.className = "fixed inset-0 pointer-events-none z-50";
            confetti.innerHTML = Array.from({
                length: 50
            }, (_, i)=>{
                const colors = [
                    "#ff00ff",
                    "#9333ea",
                    "#3b82f6"
                ];
                const color = colors[i % colors.length];
                const left = Math.random() * 100;
                const delay = Math.random() * 2;
                return `<div class="absolute w-2 h-2 rounded-full" style="background: ${color}; left: ${left}%; top: -10px; animation: confetti-fall 3s ${delay}s linear forwards; box-shadow: 0 0 10px ${color};"></div>`;
            }).join("");
            document.body.appendChild(confetti);
            setTimeout(()=>confetti.remove(), 5000);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (result?.logos?.imageUrls?.length > 0 && !hasGenerated) {
            triggerConfetti();
        }
    }, [
        result,
        hasGenerated
    ]);
    // ------------------------------------------------
    // 1) MAIN: Generate Brand + Strategy + Logos
    // ------------------------------------------------
    const handleGenerate = async ()=>{
        setLoading(true);
        setError(null);
        setHasGenerated(false);
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    brandName,
                    idea,
                    audience,
                    tone,
                    industry
                })
            });
            let data;
            try {
                data = await res.json();
            } catch (parseError) {
                const text = await res.text();
                throw new Error(`Server returned invalid JSON: ${text.slice(0, 200)}`);
            }
            if (!res.ok) {
                setError(data.error || `Request failed with status ${res.status}`);
            } else {
                setResult(data);
                setView("results");
                setActiveTab("overview");
            }
        } catch (err) {
            setError(err.message || "Network error occurred");
        } finally{
            setLoading(false);
        }
    };
    // ------------------------------------------------
    // 2) REGENERATE LOGO ONLY (calls /api/stability) – robust JSON parsing
    // ------------------------------------------------
    const handleRegenerateLogo = async ()=>{
        if (!brandName && !result?.branding?.nameOptions?.[0]) {
            setError("Need a brand name to regenerate logo.");
            return;
        }
        setLogoLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/stability", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    brandName: brandName || result?.branding?.nameOptions?.[0],
                    industry,
                    tone,
                    targetAudience: audience,
                    numImages: 2
                })
            });
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch  {
                console.error("Raw /api/stability response (non‑JSON):", text);
                setError(`Backend (/api/stability) returned non‑JSON. First part: ${text.slice(0, 120)}...`);
                return;
            }
            if (!res.ok) {
                setError(data?.error || `Logo regeneration failed with status ${res.status}`);
            } else if (!data?.imageUrls || data.imageUrls.length === 0) {
                setError("Stability response did not contain any image data");
            } else {
                // merge new logos into existing result
                setResult((prev)=>({
                        ...prev || {},
                        logos: {
                            promptUsed: data.promptUsed,
                            imageUrls: data.imageUrls
                        }
                    }));
            }
        } catch (err) {
            setError(err.message || "Network error while regenerating logo");
        } finally{
            setLogoLoading(false);
        }
    };
    // ------------------------------------------------
    // 3) DOWNLOAD LOGOS SECTION AS PDF
    // ------------------------------------------------
    const handleDownloadLogosPdf = async ()=>{
        if (!logoSectionRef.current) return;
        try {
            const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(logoSectionRef.current, {
                scale: 2,
                useCORS: true
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
                orientation: "portrait",
                unit: "pt",
                format: "a4"
            });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth - 40;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const y = 20;
            if (imgHeight > pageHeight - 40) {
                pdf.addImage(imgData, "PNG", 20, 20, imgWidth, pageHeight - 40);
            } else {
                pdf.addImage(imgData, "PNG", 20, y, imgWidth, imgHeight);
            }
            pdf.save("logos.pdf");
        } catch (err) {
            console.error("PDF generation error:", err);
            setError("Could not generate PDF. Please try again.");
        }
    };
    // ---------- RENDER HELPERS FOR TABS ----------
    const renderBrandOverviewTab = ()=>{
        if (!result) return null;
        const strategy = result?.brandStrategy ?? result?.brand ?? result?.branding ?? result?.strategy ?? null;
        const business = result?.business ?? null;
        const branding = result?.branding ?? null;
        const hasStrategyData = strategy || business || branding;
        if (!hasStrategyData) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-purple-200/70",
                children: "No brand strategy data returned yet. Try generating again."
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                lineNumber: 297,
                columnNumber: 9
            }, this);
        }
        const renderArray = (arr, maxItems = 10)=>{
            if (!Array.isArray(arr) || arr.length === 0) return null;
            const items = arr.slice(0, maxItems);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2 mt-2",
                children: items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "px-3 py-1 rounded-full bg-slate-900/70 border border-purple-500/30 text-sm text-purple-100",
                        children: typeof item === "string" ? item : JSON.stringify(item)
                    }, idx, false, {
                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                        lineNumber: 312,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                lineNumber: 310,
                columnNumber: 9
            }, this);
        };
        const renderField = (label, value, isArray = false)=>{
            if (value === null || value === undefined || value === "") return null;
            if (isArray && Array.isArray(value)) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-purple-300/80 uppercase tracking-wide font-medium",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 328,
                            columnNumber: 13
                        }, this),
                        renderArray(value)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 327,
                    columnNumber: 11
                }, this);
            }
            if (typeof value === "string" || typeof value === "number") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-purple-300/80 uppercase tracking-wide font-medium",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 338,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-slate-100 text-sm leading-relaxed",
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 341,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 337,
                    columnNumber: 11
                }, this);
            }
            return null;
        };
        const brandNameValue = brandName || branding?.nameOptions?.[0] || branding?.name || strategy?.name || null;
        const tagline = branding?.taglineOptions?.[0] || branding?.tagline || strategy?.tagline || null;
        const brandDescription = branding?.brandStory || business?.summary || strategy?.description || strategy?.brandStory || null;
        const brandVoice = branding?.brandVoice || strategy?.brandVoice || tone || null;
        const targetAudience = branding?.targetAudience || business?.targetAudience || strategy?.targetAudience || audience || null;
        const valueProposition = business?.valueProposition || strategy?.valueProposition || strategy?.usp || null;
        const mission = strategy?.mission || business?.mission || null;
        const vision = strategy?.vision || business?.vision || null;
        const coreValues = strategy?.coreValues || strategy?.values || branding?.messagingPillars || null;
        const colorPalette = branding?.colorPalette || strategy?.colorPalette || null;
        const typography = branding?.fontSuggestions || strategy?.typography || null;
        const keywords = strategy?.keywords || strategy?.tags || business?.keyWords || null;
        const marketPositioning = strategy?.marketPositioning || business?.marketNeed || strategy?.positioning || null;
        const industryValue = industry || strategy?.industry || business?.industry || null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                        renderField("Brand Name", brandNameValue),
                        renderField("Tagline", tagline),
                        brandDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:col-span-2 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-purple-300/80 uppercase tracking-wide font-medium",
                                    children: "Brand Description"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 421,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-slate-100 text-sm leading-relaxed",
                                    children: brandDescription
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 424,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 420,
                            columnNumber: 13
                        }, this),
                        renderField("Brand Voice / Tone", brandVoice),
                        renderField("Target Audience", targetAudience, true),
                        renderField("Industry", industryValue),
                        renderField("Unique Selling Proposition", valueProposition),
                        renderField("Mission", mission),
                        renderField("Vision", vision),
                        coreValues && renderField("Core Values", coreValues, true),
                        keywords && renderField("Keywords", keywords, true),
                        renderField("Market Positioning", marketPositioning)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 415,
                    columnNumber: 9
                }, this),
                colorPalette && Array.isArray(colorPalette) && colorPalette.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-purple-300/80 uppercase tracking-wide font-medium",
                            children: "Color Palette"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 445,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4",
                            children: colorPalette.map((color, idx)=>{
                                const hex = color?.hex || color?.color || color;
                                const name = color?.name || `Color ${idx + 1}`;
                                const usage = color?.usage;
                                const hexValue = typeof hex === "string" ? hex : "#000000";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg p-3 bg-slate-950/80 border border-purple-500/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-16 rounded-md mb-2 border border-slate-700",
                                            style: {
                                                backgroundColor: hexValue
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 459,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-100 font-medium truncate",
                                            children: name
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 463,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-purple-200/80 font-mono truncate",
                                            children: hexValue
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 466,
                                            columnNumber: 23
                                        }, this),
                                        usage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-purple-300/70 mt-1 line-clamp-2",
                                            children: usage
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 470,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 455,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 448,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 444,
                    columnNumber: 13
                }, this),
                typography && Array.isArray(typography) && typography.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-purple-300/80 uppercase tracking-wide font-medium",
                            children: "Typography"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 485,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                            children: typography.map((font, idx)=>{
                                const role = font?.role || font?.type || "Font";
                                const fontName = font?.font || font?.name || font;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg p-3 bg-slate-950/80 border border-purple-500/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-purple-300/80 uppercase tracking-wide",
                                            children: role
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 497,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-slate-100 font-medium mt-1",
                                            style: {
                                                fontFamily: fontName
                                            },
                                            children: fontName
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 500,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 493,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 488,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 484,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
            lineNumber: 414,
            columnNumber: 7
        }, this);
    };
    const renderMarketingTab = ()=>{
        const marketing = result?.marketing;
        const business = result?.business;
        if (!marketing && !business) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-purple-200/70",
                children: "No marketing data returned yet."
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                lineNumber: 522,
                columnNumber: 9
            }, this);
        }
        const landing = marketing?.landingPage;
        const socialPosts = marketing?.socialPosts;
        const campaigns = marketing?.campaignIdeas;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                landing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl bg-gradient-to-br from-slate-950/90 via-slate-950/80 to-slate-900/80 border border-purple-500/40 p-5 md:p-6 shadow-lg shadow-purple-900/40",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg md:text-xl font-semibold text-slate-50 mb-2",
                            children: landing.heroHeadline
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 537,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-purple-100 mb-4",
                            children: landing.heroSubheadline
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 540,
                            columnNumber: 13
                        }, this),
                        landing.sections && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: landing.sections.map((sec, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg bg-slate-950/80 border border-purple-500/30 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-semibold text-slate-50 mb-1",
                                            children: sec.title
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 550,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-purple-100/90",
                                            children: sec.body
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 553,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 546,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 544,
                            columnNumber: 15
                        }, this),
                        landing.primaryCTA && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/70 text-slate-50",
                                children: [
                                    "Primary CTA: ",
                                    landing.primaryCTA
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                lineNumber: 560,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 559,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 536,
                    columnNumber: 11
                }, this),
                socialPosts && Array.isArray(socialPosts) && socialPosts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-semibold text-slate-50 uppercase tracking-wide",
                            children: "Social Post Ideas"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 573,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: socialPosts.map((post, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-lg bg-slate-950/80 border border-purple-500/30 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-purple-300/80 uppercase tracking-wide mb-1",
                                            children: post.platform || "Social"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-100 mb-2",
                                            children: post.caption
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 585,
                                            columnNumber: 21
                                        }, this),
                                        post.imagePrompt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-purple-300/80",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold",
                                                    children: "Image prompt:"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 25
                                                }, this),
                                                " ",
                                                post.imagePrompt
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 589,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 578,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 576,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 572,
                    columnNumber: 13
                }, this),
                campaigns && Array.isArray(campaigns) && campaigns.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-semibold text-slate-50 uppercase tracking-wide",
                            children: "Campaign Ideas"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 603,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside space-y-1 text-sm text-purple-100",
                            children: campaigns.map((c, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: typeof c === "string" ? c : JSON.stringify(c)
                                }, idx, false, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 608,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 606,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 602,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
            lineNumber: 533,
            columnNumber: 7
        }, this);
    };
    const renderContentPlanTab = ()=>{
        const contentPlan = result?.marketing?.contentPlan15Days;
        if (!contentPlan || !Array.isArray(contentPlan) || contentPlan.length === 0) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-purple-200/70",
                children: "No content plan data returned yet."
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                lineNumber: 623,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-purple-100/90 mb-2",
                    children: "15-day content plan for your brand."
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 631,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: contentPlan.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg bg-slate-950/80 border border-purple-500/30 p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-purple-300/80 uppercase tracking-wide",
                                        children: [
                                            "Day ",
                                            item.day ?? idx + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 641,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 640,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-100",
                                    children: item.idea
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 645,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 636,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 634,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
            lineNumber: 630,
            columnNumber: 7
        }, this);
    };
    const renderLogosTab = ()=>{
        if (!result?.logos?.imageUrls || result.logos.imageUrls.length === 0) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-purple-200/70",
                children: "No logos generated yet. Try generating or regenerating logos."
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                lineNumber: 656,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-purple-100/90",
                            children: "Preview your AI-generated logo options. You can regenerate them or export as a PDF for download or sharing."
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 665,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleRegenerateLogo,
                                    disabled: logoLoading,
                                    className: "px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 active:scale-95 text-sm",
                                    children: logoLoading ? "Regenerating..." : "Regenerate Logos Only"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 670,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleDownloadLogosPdf,
                                    className: "px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 active:scale-95 text-sm",
                                    children: "Download Logos as PDF"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 677,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 669,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 664,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: logoSectionRef,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4",
                        children: result.logos.imageUrls.map((img, idx)=>{
                            const url = typeof img === "string" ? img : img.url;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl p-4 bg-slate-950/80 border border-purple-500/40 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-900/40 transition-all duration-300 cursor-pointer group",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "aspect-square flex items-center justify-center bg-slate-900 rounded-lg overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: url,
                                        alt: `Logo ${idx + 1}`,
                                        crossOrigin: "anonymous",
                                        className: "w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300",
                                        onError: (e)=>{
                                            const target = e.currentTarget;
                                            target.onerror = null;
                                            target.src = 'data:image/svg+xml;utf8,' + '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">' + '<rect width="100%" height="100%" fill="%23111"/>' + '<text x="50%" y="50%" fill="%23aaa" font-size="28" text-anchor="middle" dominant-baseline="middle">' + 'Logo%20Preview' + '</text>' + '</svg>';
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 696,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 695,
                                    columnNumber: 19
                                }, this)
                            }, idx, false, {
                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                lineNumber: 691,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                        lineNumber: 687,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 686,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
            lineNumber: 663,
            columnNumber: 7
        }, this);
    };
    // ---------- MAIN RENDER ----------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen pb-16 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-12 pb-8 px-4 animate-fade-up",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.65)]",
                            children: "Pathway GEN AI – Brand Generator"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 731,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg md:text-xl text-purple-200 font-light tracking-wide",
                            children: "Design brands with AI in 30 seconds"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 734,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                    lineNumber: 730,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                lineNumber: 729,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-5xl mx-auto px-4 space-y-6",
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl p-4 border border-red-500/60 bg-red-950/40 shadow-lg shadow-red-900/40 animate-fade-up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-200 font-medium",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-red-300 font-bold",
                                    children: "Error:"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                    lineNumber: 745,
                                    columnNumber: 15
                                }, this),
                                " ",
                                error
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                            lineNumber: 744,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                        lineNumber: 743,
                        columnNumber: 11
                    }, this),
                    view === "input" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl p-6 md:p-8 animate-fade-up shadow-2xl bg-slate-950/70 border border-purple-500/40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Brand Name (optional)",
                                        value: brandName,
                                        onChange: (e)=>setBrandName(e.target.value),
                                        className: "w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 754,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        placeholder: "Business Idea",
                                        value: idea,
                                        onChange: (e)=>setIdea(e.target.value),
                                        rows: 4,
                                        className: "w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all resize-none"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 762,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Target Audience",
                                        value: audience,
                                        onChange: (e)=>setAudience(e.target.value),
                                        className: "w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 770,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Tone (e.g. playful, bold, luxury)",
                                        value: tone,
                                        onChange: (e)=>setTone(e.target.value),
                                        className: "w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 778,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Industry",
                                        value: industry,
                                        onChange: (e)=>setIndustry(e.target.value),
                                        className: "w-full px-4 py-3 rounded-lg bg-black/40 border border-purple-500/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/60 transition-all"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 786,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                lineNumber: 753,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-4 mt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleGenerate,
                                        disabled: loading || !idea,
                                        className: "flex-1 px-6 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95",
                                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                                    lineNumber: 804,
                                                    columnNumber: 21
                                                }, this),
                                                "Generating..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 803,
                                            columnNumber: 19
                                        }, this) : "Generate Brand + Logos"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 797,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleRegenerateLogo,
                                        disabled: logoLoading || !brandName && !result,
                                        className: "flex-1 px-6 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95",
                                        children: logoLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                                    lineNumber: 819,
                                                    columnNumber: 21
                                                }, this),
                                                "Regenerating..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 818,
                                            columnNumber: 19
                                        }, this) : "Regenerate Logos Only"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 812,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                lineNumber: 796,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                        lineNumber: 752,
                        columnNumber: 11
                    }, this),
                    view === "results" && result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 animate-fade-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setView("input"),
                                        className: "inline-flex items-center gap-2 text-sm text-purple-200 hover:text-purple-100 px-3 py-1 rounded-full bg-slate-900/80 border border-purple-500/40",
                                        children: "← Back to Inputs"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 834,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-purple-300/80",
                                        children: "Generated brand strategy & assets based on your inputs."
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 840,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                lineNumber: 833,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl p-5 md:p-6 bg-slate-950/70 border border-purple-500/40 shadow-2xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2 mb-5",
                                        children: [
                                            {
                                                id: "overview",
                                                label: "Overview"
                                            },
                                            {
                                                id: "marketing",
                                                label: "Marketing"
                                            },
                                            {
                                                id: "content",
                                                label: "Content Plan"
                                            },
                                            {
                                                id: "logos",
                                                label: "Logos"
                                            }
                                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveTab(tab.id),
                                                className: `px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeTab === tab.id ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-900/50" : "bg-slate-900/80 text-purple-200 border-purple-500/40 hover:bg-slate-800"}`,
                                                children: tab.label
                                            }, tab.id, false, {
                                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                                lineNumber: 855,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 848,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3",
                                        children: [
                                            activeTab === "overview" && renderBrandOverviewTab(),
                                            activeTab === "marketing" && renderMarketingTab(),
                                            activeTab === "content" && renderContentPlanTab(),
                                            activeTab === "logos" && renderLogosTab()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 874,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                lineNumber: 846,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl p-4 bg-slate-950/80 border border-purple-500/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowJson(!showJson),
                                        className: "w-full flex items-center justify-between text-left mb-2 font-semibold text-purple-200 hover:text-purple-100 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Raw JSON Output"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                                        lineNumber: 889,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-purple-400/70",
                                                        children: "(Developer Mode)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                                lineNumber: 888,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl transform transition-transform duration-200",
                                                children: showJson ? "−" : "+"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                                lineNumber: 894,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 884,
                                        columnNumber: 15
                                    }, this),
                                    showJson && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 rounded-lg overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Pathway$2d$GEN$2d$AI$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                            className: "p-4 bg-black/60 rounded-lg overflow-auto max-h-72 text-xs font-mono text-purple-100 border border-purple-500/40",
                                            children: JSON.stringify(result, null, 2)
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                            lineNumber: 900,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                        lineNumber: 899,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                                lineNumber: 883,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                        lineNumber: 832,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
                lineNumber: 740,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Desktop/Pathway-GEN-AI/app/page.tsx",
        lineNumber: 727,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ced8050c._.js.map