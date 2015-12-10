/*
Gets organisations by a fuzzy search
*/

IF EXISTS(SELECT * FROM sys.columns
          WHERE Name = N'{ colName }'
          AND Object_ID = Object_ID(N'Customer'))

BEGIN
  SELECT TOP 12  [customerId], [customerNumber], [orgNr], [orgName]
  FROM [dbo].[Customer]
  WHERE [{ colName }] LIKE '%' + @query + '%';
END