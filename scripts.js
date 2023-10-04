let loadedXMLText = "";

        function carregarXML() {
            const input = document.getElementById("xmlFileInput");
            const xmlContent = document.getElementById("xmlContent");

            const file = input.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (event) {
                    const xmlText = event.target.result;
                    loadedXMLText = xmlText;
                    xmlContent.textContent = xmlText;

                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

                    // Preencher campos do formulário com dados do XML
                    const nename = xmlDoc.querySelector("NENAME").textContent;
                    document.getElementById("nename").value = nename;

                    const latitudeDegFormat = xmlDoc.querySelector("LATITUDEDEGFORMAT").textContent;
                    document.getElementById("latitudeDegFormat").value = latitudeDegFormat;

                    const longitudeDegFormat = xmlDoc.querySelector("LONGITUDEDEGFORMAT").textContent;
                    document.getElementById("longitudeDegFormat").value = longitudeDegFormat;

                    const eNodeBId = xmlDoc.querySelector("eNodeBId").textContent;
                    document.getElementById("eNodeBId").value = eNodeBId;

                    const gNBId = xmlDoc.querySelector("gNBId").textContent;
                    document.getElementById("gNBId").value = gNBId;

                    const SRCIP = xmlDoc.querySelectorAll("SRCIP");
                    for (let i = 0; i < SRCIP.length && i < 5; i++) {
                        document.getElementById(`SRCIP${i + 1}`).value = SRCIP[i].textContent;
                    }

                    const NEXTHOP = xmlDoc.querySelectorAll("NEXTHOP");
                    for (let i = 0; i < NEXTHOP.length && i < 3; i++) {
                        document.getElementById(`NEXTHOP${i + 1}`).value = NEXTHOP[i].textContent;
                    }

                    const SPEED = xmlDoc.querySelectorAll("SPEED");
                    for (let i = 0; i < SPEED.length && i < 4; i++) {
                        document.getElementById(`SPEED${i + 1}`).value = SPEED[i].textContent;
                    }

                    for (let i = 1; i <= 6; i++) {
                        const PhyCellId = xmlDoc.querySelector(`class > Cell:nth-child(${i}) > attributes > PhyCellId`).innerHTML;
                        document.getElementById(`PhyCellId${i}`).value = PhyCellId;
                    }

                    for (let i = 1; i <= 6; i++) {
                        const RootSequenceIdx = xmlDoc.querySelector(`class > Cell:nth-child(${i}) > attributes > RootSequenceIdx`).innerHTML;
                        document.getElementById(`RootSequenceIdx${i}`).value = RootSequenceIdx;
                    }

                    for (let i = 1; i <= 1; i++) {
                        const Tac = xmlDoc.querySelector(`class > CnOperatorTa:nth-child(${i}) > attributes > Tac`).innerHTML;
                        document.getElementById(`Tac${i}`).value = Tac;
                    }

                    for (let i = 1; i <= 3; i++) {
                        const PhysicalCellId = xmlDoc.querySelector(`class > NRDUCell:nth-child(${i}) > attributes > PhysicalCellId`).textContent;
                        document.getElementById(`PhysicalCellId${i}`).value = PhysicalCellId;
                    }

                    for (let i = 1; i <= 3; i++) {
                        const LogicalRootSequenceIndex = xmlDoc.querySelector(`class > NRDUCell:nth-child(${i}) > attributes > LogicalRootSequenceIndex`).innerHTML;
                        document.getElementById(`LogicalRootSequenceIndex${i}`).value = LogicalRootSequenceIndex;
                    }

                    const TAC = xmlDoc.querySelector('class > gNBTrackingArea:nth-child(1) > attributes > Tac').innerHTML
                    document.getElementById("Tac").value = TAC;
                }
                reader.readAsText(file);
            } else {
                xmlContent.textContent = "Nenhum arquivo selecionado.";
            }
        }

        function ajustarTagsVazias(xmlText) {
            const tagsParaAjustar = ['APPMMSETREMARK', 'EXTAPPTYPE', 'HOTPATCHVERSION', 'APPHOTPATCHVERSION',
                'LOCATION', 'USERLABEL', 'DID', 'SITENAME', 'USERADDINFO', 'COUNTRY', 'ORG', 'ORGUNIT', 'STATEPROVINCENAME',
                'LOCALITY', 'KEY', 'ADDRESS', 'CITY', 'CONTACT', 'OFFICE', 'REGION', 'TELEPHONE', 'DESC', 'LOCATIONNAME',
                'MMSETREMARK', 'BRDSPEC', 'IKELNM', 'REMOTEID', 'UserLabel', 'AntennaPortMapping', 'CellName', 'LocalCellName',
                'NeighbourCellName', 'Action', 'ServingNetworkSliceId', 'LOCALNAME', 'moclistincluded', 'USERLABLE', 'spec:moclistincluded'
            ];

            for (const tag of tagsParaAjustar) {
                const regex = new RegExp(`<${tag}/>`, 'g');
                xmlText = xmlText.replace(regex, `<${tag}></${tag}>`);
            }

            return xmlText;
        }

        function salvarXML() {

            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("nename").value.trim(), document.getElementById("nename_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("latitudeDegFormat").value.trim(), document.getElementById("latitudeDegFormat_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("longitudeDegFormat").value.trim(), document.getElementById("longitudeDegFormat_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("eNodeBId").value.trim(), document.getElementById("eNodeBId_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("gNBId").value.trim(), document.getElementById("gNBId_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("SRCIP1").value.trim(), document.getElementById("SRCIP1_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("SRCIP2").value.trim(), document.getElementById("SRCIP2_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("SRCIP3").value.trim(), document.getElementById("SRCIP3_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("SRCIP4").value.trim(), document.getElementById("SRCIP4_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("SRCIP5").value.trim(), document.getElementById("SRCIP5_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("NEXTHOP1").value.trim(), document.getElementById("NEXTHOP1_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("NEXTHOP2").value.trim(), document.getElementById("NEXTHOP2_").value.trim());
            loadedXMLText = loadedXMLText.replaceAll(document.getElementById("NEXTHOP3").value.trim(), document.getElementById("NEXTHOP3_").value.trim());

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(loadedXMLText, "text/xml");

            const SRCIP = xmlDoc.querySelectorAll("SRCIP");
            for (let i = 0; i < SRCIP.length && i < 5; i++) {
                SRCIP[i].textContent = document.getElementById(`SRCIP${i + 1}_`).value.trim();
            }

            const NEXTHOP = xmlDoc.querySelectorAll("NEXTHOP");
            for (let i = 0; i < NEXTHOP.length && i < 3; i++) {
                NEXTHOP[i].textContent = document.getElementById(`NEXTHOP${i + 1}_`).value.trim();
            }

            const SPEED = xmlDoc.querySelectorAll("SPEED");
            for (let i = 0; i < SPEED.length && i < 4; i++) {
                SPEED[i].textContent = document.getElementById(`SPEED${i + 1}`).value.trim();
            }

            for (let i = 1; i <= 6; i++) {
                const inputField = document.getElementById(`PhyCellId${i}`);
                const newValue = inputField.value.trim();
                xmlDoc.querySelector(`class > Cell:nth-child(${i}) > attributes > PhyCellId`).textContent = newValue;
            }

            for (let i = 1; i <= 6; i++) {
                const inputField = document.getElementById(`RootSequenceIdx${i}`);
                const newValue = inputField.value.trim();
                xmlDoc.querySelector(`class > Cell:nth-child(${i}) > attributes > RootSequenceIdx`).textContent = newValue;
            }

            for (let i = 1; i <= 1; i++) {
                const inputField = document.getElementById(`Tac${i}`);
                const newValue = inputField.value.trim();
                xmlDoc.querySelector(`class > CnOperatorTa:nth-child(${i}) > attributes > Tac`).textContent = newValue;
            }

            for (let i = 1; i <= 3; i++) {
                const inputField = document.getElementById(`PhysicalCellId${i}`);
                const newValue = inputField.value.trim();
                xmlDoc.querySelector(`class > NRDUCell:nth-child(${i}) > attributes > PhysicalCellId`).textContent = newValue;
            }

            for (let i = 1; i <= 3; i++) {
                const inputField = document.getElementById(`LogicalRootSequenceIndex${i}`);
                const newValue = inputField.value.trim();
                xmlDoc.querySelector(`class > NRDUCell:nth-child(${i}) > attributes > LogicalRootSequenceIndex`).textContent = newValue;
            }

            const inputField = document.getElementById(`Tac`);
            const newValue = inputField.value.trim();
            xmlDoc.querySelector(`class > gNBTrackingArea:nth-child(1) > attributes > Tac`).textContent = newValue;

            // Serialize o XML atualizado para uma string
            const xmlText = new XMLSerializer().serializeToString(xmlDoc);

            // Atualize loadedXMLText com a nova string XML
            loadedXMLText = xmlText;

            // Atualize a área de conteúdo com o XML atualizado
            const xmlContent = document.getElementById("xmlContent");
            xmlContent.textContent = xmlText;

            loadedXMLText = ajustarTagsVazias(loadedXMLText);

            loadedXMLText = loadedXMLText.replace('?>', '?>\n');
            loadedXMLText = loadedXMLText.replace('BACKUPCFG>', 'BACKUPCFG>\n');

            // Exporte o XML atualizado
            exportarXML();
        }

        function exportarXML() {
            const blob = new Blob([loadedXMLText], {
                type: "text/xml;charset=ISO-8859-1"
            });
            const url = URL.createObjectURL(blob);

            const exportButton = document.getElementById("exportButton");
            exportButton.style.display = "block";
            exportButton.addEventListener("click", function () {
                const a = document.createElement("a");
                a.href = url;
                a.download = "xml_editado.xml";
                a.click();
                URL.revokeObjectURL(url);
            });
        }