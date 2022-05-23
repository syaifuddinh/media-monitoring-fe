export default [
    {
        title: "manajemen",
        items: [
            {
                title: "detail event",
                icon: "Iconly/DarkGrey/Document.svg",
                url: "/detail",
                shown: "*"
            },
            {
                title: "entri event",
                icon: "Iconly/DarkGrey/Login.svg",
                url: "/entry",
                shown: "schedule;booking;conferences"
            },
            {
                title: "venue",
                icon: "Iconly/DarkGrey/Location.svg",
                url: "/venue",
                shown: "conferences"
            },
            {
                title: "penjadwalan",
                icon: "Iconly/DarkGrey/Calendar.svg",
                url: "/schedule",
                shown: "schedule;conferences"
            },
            {
                title: "engagement",
                icon: "Iconly/DarkGrey/Video.svg",
                url: "/engagement",
                shown: "conferences"
            },
            {
                title: "ketersediaan",
                icon: "Iconly/DarkGrey/Calendar.svg",
                url: "/availibility",
                shown: "booking"
            },
            {
                title: "speaker & host",
                icon: "Iconly/DarkGrey/3 User.svg",
                url: "/speaker-and-host",
                shown: "schedule;conferences;booking"
            },
            {
                title: "booth",
                icon: "DarkGrey/ico-booth.svg",
                url: "/booth",
                shown: "conferences"
            },
            {
                title: "sponsor",
                icon: "Iconly/DarkGrey/Star.svg",
                url: "/sponsor",
                shown: "conferences"
            },
            {
                title: "stage backdrop",
                icon: "DarkGrey/ico-stage.svg",
                url: "/stage-backdrop",
                shown: "conferences"
            },
            {
                title: "tiket",
                icon: "Iconly/DarkGrey/Ticket.svg",
                url: "/ticket",
                shown: "schedule;conferences"
            }
        ]
    },
    {
        title: "lainnya",
        items: [
            {
                title: "video",
                icon: "Iconly/DarkGrey/Video.svg",
                url: "/video",
                shown: "*"
            },
            {
                title: "livestream",
                icon: "DarkGrey/ico-live.svg",
                url: "/livestream",
                shown: "*"
            },
            {
                title: "integrasi",
                icon: "DarkGrey/ico-extension.svg",
                url: "/integration",
                shown: "*"
            }
        ]
    }
]