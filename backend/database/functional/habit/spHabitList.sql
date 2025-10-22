-- =============================================
-- Stored Procedure: spHabitList
-- Description: Lists habits for a user with optional filters
-- =============================================
CREATE OR ALTER PROCEDURE [functional].[spHabitList]
    @idAccount INT,
    @idUser INT,
    @filterStatus NVARCHAR(20) = 'ativos',
    @idCategory INT = NULL,
    @orderBy NVARCHAR(50) = 'data_cadastro_desc'
AS
BEGIN
    SET NOCOUNT ON;

    -- Validation: Required fields
    IF @idAccount IS NULL OR @idAccount <= 0
    BEGIN
        THROW 51000, 'idAccountRequired', 1;
        RETURN;
    END

    IF @idUser IS NULL OR @idUser <= 0
    BEGIN
        THROW 51000, 'idUserRequired', 1;
        RETURN;
    END

    -- Build query with filters
    SELECT
        [id],
        [idAccount],
        [idUser],
        [name],
        [description],
        [frequencyType],
        [weekDays],
        [monthDays],
        [scheduledTime],
        [estimatedMinutes],
        [startDate],
        [idCategory],
        [status],
        [dateCreated],
        [dateModified],
        [deleted]
    FROM [functional].[habit]
    WHERE
        [idAccount] = @idAccount
        AND [idUser] = @idUser
        AND [deleted] = 0
        AND (
            @filterStatus = 'todos'
            OR (@filterStatus = 'ativos' AND [status] = 'ativo')
            OR (@filterStatus = 'inativos' AND [status] = 'inativo')
            OR (@filterStatus = 'concluidos' AND [status] = 'concluido')
        )
        AND (
            @idCategory IS NULL
            OR [idCategory] = @idCategory
        )
    ORDER BY
        CASE WHEN @orderBy = 'nome_asc' THEN [name] END ASC,
        CASE WHEN @orderBy = 'nome_desc' THEN [name] END DESC,
        CASE WHEN @orderBy = 'data_inicio_asc' THEN [startDate] END ASC,
        CASE WHEN @orderBy = 'data_inicio_desc' THEN [startDate] END DESC,
        CASE WHEN @orderBy = 'data_cadastro_asc' THEN [dateCreated] END ASC,
        CASE WHEN @orderBy = 'data_cadastro_desc' THEN [dateCreated] END DESC;
END
GO