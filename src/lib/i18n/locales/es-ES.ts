const esES = {
    app: {
        name: "Clusters Flow",
    },

    common: {
        save: "Guardar",
        run: "Ejecutar",
        reset: "Restablecer",
        online: "En línea",
        close: "Cerrar",
    },

    blocks: {
        research: "Investigación",
        copywriting: "Copywriting",
        seo: "SEO",
        layout: "Diseño",
        qa: "QA",
        publisher: "Publicador",
    },

    sidebar: {
        palette: "Paleta",
        inspector: "Inspector",
        promptPlaceholder: "Escriba el comando...",
        coreModel: "Modelo Base",
        selectElement: "Seleccione un elemento para inspeccionar",
        assistant: "Asistente",
        talkToAi: "Hablar con IA...",
    },

    messages: {
        welcome: "¡Bienvenido! ¿Cómo puedo ayudarte hoy?",
        blockAdded: "He añadido el bloque a tu lienzo.",
    },

    builder: {
        topbar: {
            publish: "Publicar",
            preview: "Vista previa",
            undo: "Deshacer",
            redo: "Rehacer",
            viewportLabel: "px",
            projectTitle: "Campaña de Marketing",
            projectSubtitle: "v1.0.4 - Guardado hace 2 min",
            desktop: "Escritorio",
            tablet: "Tableta",
            mobile: "Móvil",
            toggleInspector: "Alternar Inspector",
        },
        leftPanel: {
            tabs: {
                elements: "Elementos",
                style: "Estilo",
                effects: "Efectos",
                favorites: "Favoritos",
            },
            searchPlaceholder: "Buscar elementos",
            groups: {
                structure: "Estructura",
                typography: "Tipografía",
            },
            blocks: {
                section: "Sección",
                container: "Contenedor",
                quickStack: "Quick Stack",
                columns: "Columnas",
                list: "Lista",
                heading: "Encabezado",
                paragraph: "Párrafo",
                link: "Enlace",
            },
            emptyFavorites: "Sin favoritos aún",
        },
        inspector: {
            tabs: {
                layers: "Capas",
                globals: "Globales",
                library: "Biblioteca",
                history: "Historial",
            },
            searchModels: "Buscar modelos",
            domTree: "Árbol DOM",
            globalStyles: "Estilos Globales",
        },
        canvas: {
            empty: "Arrastra un elemento para empezar",
        },
    },

    preview: {
        backToEditor: "Volver al Editor",
        title: "Modo de Vista Previa",
        subtitle: "Así es como se verá tu página de destino para tus visitantes.",
    },
} as const;

export default esES;
