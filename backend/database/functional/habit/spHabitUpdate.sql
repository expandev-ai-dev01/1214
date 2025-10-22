-- =============================================
-- Stored Procedure: spHabitUpdate
-- Description: Updates an existing habit
-- =============================================
CREATE OR ALTER PROCEDURE [functional].[spHabitUpdate]
    @idAccount INT,
    @idUser INT,
    @id INT,
    @name NVARCHAR(50),
    @description NVARCHAR(200) = NULL,
    @frequencyType NVARCHAR(20),
    @weekDays NVARCHAR(MAX) = NULL,
    @monthDays NVARCHAR(MAX) = NULL,
    @scheduledTime TIME = NULL,
    @estimatedMinutes INT = NULL,
    @startDate DATE,
    @idCategory INT = NULL,
    @status NVARCHAR(20)
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

    IF @id IS NULL OR @id <= 0
    BEGIN
        THROW 51000, 'O hábito selecionado não existe', 1;
        RETURN;
    END

    -- Check if habit exists and belongs to user
    IF NOT EXISTS (
        SELECT 1 FROM [functional].[habit]
        WHERE [id] = @id
        AND [idAccount] = @idAccount
        AND [idUser] = @idUser
        AND [deleted] = 0
    )
    BEGIN
        THROW 51000, 'Você não tem permissão para editar este hábito', 1;
        RETURN;
    END

    -- Validation: Name
    IF @name IS NULL OR LTRIM(RTRIM(@name)) = ''
    BEGIN
        THROW 51000, 'O nome do hábito é obrigatório', 1;
        RETURN;
    END

    IF LEN(@name) > 50
    BEGIN
        THROW 51000, 'O nome do hábito deve ter no máximo 50 caracteres', 1;
        RETURN;
    END

    IF @description IS NOT NULL AND LEN(@description) > 200
    BEGIN
        THROW 51000, 'A descrição deve ter no máximo 200 caracteres', 1;
        RETURN;
    END

    IF @frequencyType IS NULL OR @frequencyType NOT IN ('diaria', 'semanal', 'mensal')
    BEGIN
        THROW 51000, 'Selecione a frequência do hábito', 1;
        RETURN;
    END

    -- Validation: Frequency-specific fields
    IF @frequencyType IN ('diaria', 'semanal') AND (@weekDays IS NULL OR @weekDays = '[]')
    BEGIN
        THROW 51000, 'Selecione pelo menos um dia da semana', 1;
        RETURN;
    END

    IF @frequencyType = 'mensal' AND (@monthDays IS NULL OR @monthDays = '[]')
    BEGIN
        THROW 51000, 'Selecione pelo menos um dia do mês', 1;
        RETURN;
    END

    -- Validation: Estimated time
    IF @estimatedMinutes IS NOT NULL AND (@estimatedMinutes < 1 OR @estimatedMinutes > 1440)
    BEGIN
        THROW 51000, 'O tempo estimado deve estar entre 1 e 1440 minutos', 1;
        RETURN;
    END

    -- Validation: Start date
    IF @startDate < CAST(GETDATE() AS DATE)
    BEGIN
        THROW 51000, 'A data de início não pode ser anterior à data atual', 1;
        RETURN;
    END

    -- Validation: Status
    IF @status NOT IN ('ativo', 'inativo', 'concluido')
    BEGIN
        THROW 51000, 'Status inválido', 1;
        RETURN;
    END

    -- Update habit
    UPDATE [functional].[habit]
    SET
        [name] = @name,
        [description] = @description,
        [frequencyType] = @frequencyType,
        [weekDays] = @weekDays,
        [monthDays] = @monthDays,
        [scheduledTime] = @scheduledTime,
        [estimatedMinutes] = @estimatedMinutes,
        [startDate] = @startDate,
        [idCategory] = @idCategory,
        [status] = @status,
        [dateModified] = GETDATE()
    WHERE
        [id] = @id
        AND [idAccount] = @idAccount
        AND [idUser] = @idUser
        AND [deleted] = 0;

    -- Return updated habit
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
    WHERE [id] = @id;
END
GO