import { formatToTimeZone } from "date-fns-timezone";

export const converterDataParaBrasil = (dataUTC: any) => {
  // Fuso horário do Brasil
  const brasilTimeZone = "America/Sao_Paulo";

  // Converte a data UTC para a zona de tempo do Brasil
  const dataUTCObj = new Date(dataUTC);

  // Formata a data para o formato desejado
  const dataHoraBrasil = formatToTimeZone(
    dataUTCObj,
    "YYYY-MM-DDTHH:mm",
    { timeZone: brasilTimeZone }
  );

  return dataHoraBrasil;
};

export const formatarDataBrasil = (dataUTCString: any) => {
  const dataUTC = new Date(dataUTCString);
  const options = { timeZone: "America/Sao_Paulo" };
  return dataUTC.toLocaleString("pt-BR", options);
};
