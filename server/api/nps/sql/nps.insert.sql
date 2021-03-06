/*
Inserts a NPS object into the table
*/

INSERT INTO [dbo].[NPSSurveyResult] (
  [npsTel],
  [npsDate],
  [npsScore],
  [npsComment],
  [isLocal],
  [doNotContact]
)
VALUES (
  @npsTel,
  @npsDate,
  @npsScore,
  @npsComment,
  @isLocal,
  @doNotContact
)

SELECT TOP 1
  [npsId],
  [npsTel],
  [npsDate],
  [npsScore],
  [npsComment],
  [dateCreated],
  [dateChanged],
  [doNotContact]
FROM [dbo].[NPSSurveyResult]
ORDER BY [npsId] DESC