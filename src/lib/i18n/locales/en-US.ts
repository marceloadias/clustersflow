const enUS = {
    app: {
        name: "Clusters Flow",
    },

    common: {
        save: "Save",
        run: "Run",
        reset: "Reset",
        online: "Online",
        close: "Close",
    },

    blocks: {
        research: "Research",
        copywriting: "Copywriting",
        seo: "SEO",
        layout: "Layout",
        qa: "QA",
        publisher: "Publisher",
    },

    sidebar: {
        palette: "Palette",
        inspector: "Inspector",
        promptPlaceholder: "Enter prompt...",
        coreModel: "Core Model",
        selectElement: "Select an element to inspect",
        assistant: "Assistant",
        talkToAi: "Talk to AI...",
    },

    messages: {
        welcome: "Welcome! How can I help you today?",
        blockAdded: "I've added the block to your canvas.",
    },

    builder: {
        topbar: {
            publish: "Publish",
            preview: "Preview",
            undo: "Undo",
            redo: "Redo",
            viewportLabel: "px",
            projectTitle: "Marketing Campaign",
            projectSubtitle: "v1.0.4 - Last saved 2m ago",
            desktop: "Desktop",
            tablet: "Tablet",
            mobile: "Mobile",
            toggleInspector: "Toggle Inspector",
        },
        leftPanel: {
            tabs: {
                elements: "Elements",
                style: "Style",
                effects: "Effects",
                favorites: "Favorites",
            },
            searchPlaceholder: "Search elements",
            groups: {
                structure: "Structure",
                typography: "Typography",
            },
            blocks: {
                section: "Section",
                container: "Container",
                quickStack: "Quick Stack",
                columns: "Columns",
                list: "List",
                heading: "Heading",
                paragraph: "Paragraph",
                link: "Link",
            },
            emptyFavorites: "No favorites yet",
        },
        inspector: {
            tabs: {
                layers: "Layers",
                globals: "Globals",
                library: "Library",
                history: "History",
            },
            searchModels: "Search models",
            domTree: "DOM Tree",
            globalStyles: "Global Styles",
        },
        canvas: {
            empty: "Drag an element to start",
        },
    },

    preview: {
        backToEditor: "Back to Editor",
        title: "Preview Mode",
        subtitle: "This is how your landing page will look to your visitors.",
    },
} as const;

export default enUS;
