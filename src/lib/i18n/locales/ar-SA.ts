const arSA = {
    app: {
        name: "تدفق العناقيد",
    },

    common: {
        save: "حفظ",
        run: "تشغيل",
        reset: "إعادة ضبط",
        online: "متصل",
        close: "إغلاق",
    },

    blocks: {
        research: "البحث",
        copywriting: "كتابة الإعلانات",
        seo: "تحسين محركات البحث",
        layout: "التخطيط",
        qa: "الجودة",
        publisher: "الناشر",
    },

    sidebar: {
        palette: "لوحة الألوان",
        inspector: "المفتش",
        promptPlaceholder: "أدخل الأمر...",
        coreModel: "النموذج الأساسي",
        selectElement: "اختر عنصراً للفحص",
        assistant: "المساعد",
        talkToAi: "تحدث مع الذكاء الاصطناعي...",
    },

    messages: {
        welcome: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
        blockAdded: "لقد أضفت العنصر إلى مساحة العمل الخاصة بك.",
    },

    builder: {
        topbar: {
            publish: "نشر",
            preview: "معاينة",
            undo: "تراجع",
            redo: "إعادة",
            viewportLabel: "بكسل",
            projectTitle: "حملة تسويقية",
            projectSubtitle: "v1.0.4 - آخر حفظ منذ دقيقتين",
            desktop: "سطح المكتب",
            tablet: "جهاز لوحي",
            mobile: "هاتف محمول",
            toggleInspector: "تبديل المفتش",
        },
        leftPanel: {
            tabs: {
                elements: "العناصر",
                style: "النمط",
                effects: "التأثيرات",
                favorites: "المفضلة",
            },
            searchPlaceholder: "البحث عن العناصر",
            groups: {
                structure: "الهيكل",
                typography: "الخطوط",
            },
            blocks: {
                section: "قسم",
                container: "حاوية",
                quickStack: "Quick Stack",
                columns: "أعمدة",
                list: "قائمة",
                heading: "عنوان",
                paragraph: "فقرة",
                link: "رابط",
            },
            emptyFavorites: "لا توجد مفضلات بعد",
        },
        inspector: {
            tabs: {
                layers: "الطبقات",
                globals: "العالمية",
                library: "المكتبة",
                history: "السجل",
            },
            searchModels: "البحث عن الموديلات",
            domTree: "شجرة DOM",
            globalStyles: "الأنماط العالمية",
        },
        canvas: {
            empty: "اسحب عنصراً للبدء",
        },
    },

    preview: {
        backToEditor: "العودة إلى المحرر",
        title: "وضع المعاينة",
        subtitle: "هذا هو الشكل الذي ستظهر به صفحتك المقصودة لزوارك.",
    },
} as const;

export default arSA;
