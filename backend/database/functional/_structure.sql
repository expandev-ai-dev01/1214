-- =============================================
-- Functional Schema Structure
-- Gerenciador de Hábitos - Habit Management
-- =============================================

-- Create functional schema if not exists
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'functional')
BEGIN
    EXEC('CREATE SCHEMA [functional]');
END
GO

-- =============================================
-- Table: [functional].[habit]
-- Description: Stores user habits with frequency and scheduling information
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[functional].[habit]') AND type in (N'U'))
BEGIN
    CREATE TABLE [functional].[habit] (
        [id] INT IDENTITY(1,1) NOT NULL,
        [idAccount] INT NOT NULL,
        [idUser] INT NOT NULL,
        [name] NVARCHAR(50) NOT NULL,
        [description] NVARCHAR(200) NULL,
        [frequencyType] NVARCHAR(20) NOT NULL CHECK ([frequencyType] IN ('diaria', 'semanal', 'mensal')),
        [weekDays] NVARCHAR(MAX) NULL, -- JSON array: ['segunda', 'terca', ...]
        [monthDays] NVARCHAR(MAX) NULL, -- JSON array: [1, 15, 30]
        [scheduledTime] TIME NULL,
        [estimatedMinutes] INT NULL CHECK ([estimatedMinutes] >= 1 AND [estimatedMinutes] <= 1440),
        [startDate] DATE NOT NULL,
        [idCategory] INT NULL,
        [status] NVARCHAR(20) NOT NULL DEFAULT 'ativo' CHECK ([status] IN ('ativo', 'inativo', 'concluido')),
        [dateCreated] DATETIME NOT NULL DEFAULT GETDATE(),
        [dateModified] DATETIME NOT NULL DEFAULT GETDATE(),
        [deleted] BIT NOT NULL DEFAULT 0,
        CONSTRAINT [PK_habit] PRIMARY KEY CLUSTERED ([id] ASC)
    );

    -- Indexes for performance
    CREATE NONCLUSTERED INDEX [IX_habit_idAccount_idUser] ON [functional].[habit] ([idAccount], [idUser]) WHERE [deleted] = 0;
    CREATE NONCLUSTERED INDEX [IX_habit_status] ON [functional].[habit] ([status]) WHERE [deleted] = 0;
    CREATE NONCLUSTERED INDEX [IX_habit_idCategory] ON [functional].[habit] ([idCategory]) WHERE [deleted] = 0;
    CREATE NONCLUSTERED INDEX [IX_habit_startDate] ON [functional].[habit] ([startDate]) WHERE [deleted] = 0;
END
GO