export const converterDataParaBrasil = (dataUTC: any) => {
  const partes = dataUTC.split("T");
  const dataFormatada = partes[0] + "T" + partes[1].split(":").slice(0, 2).join(":");

  return dataFormatada;
};

export const formatarDataBrasil = (dataUTCString: any) => {
  const partes = dataUTCString.split("T");
  const datacerta = partes[0].split('-')
  const dataFormatada = `${datacerta[2]}-${datacerta[1]}-${datacerta[0]}`  + " " + partes[1].split(":").slice(0, 2).join(":");
  

  return dataFormatada;
};