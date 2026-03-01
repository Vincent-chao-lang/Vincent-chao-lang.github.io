// ======================== UV/PV 统计模块 ========================
const StatsTracker = {
    STORAGE_KEY: 'site_stats_data',
    VISITOR_ID_KEY: 'site_visitor_id',

    // 生成或获取访客ID
    getVisitorId() {
        let visitorId = localStorage.getItem(this.VISITOR_ID_KEY);
        if (!visitorId) {
            visitorId = this.generateUUID();
            localStorage.setItem(this.VISITOR_ID_KEY, visitorId);
        }
        return visitorId;
    },

    // 生成UUID
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    // 获取统计数据
    getStats() {
        const stats = localStorage.getItem(this.STORAGE_KEY);
        if (!stats) {
            return {
                totalVisitors: 0,
                totalViews: 0,
                dailyVisitors: {},
                dailyViews: {},
                lastVisit: null
            };
        }
        return JSON.parse(stats);
    },

    // 保存统计数据
    saveStats(stats) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
    },

    // 获取今天的日期字符串
    getTodayDate() {
        return new Date().toISOString().split('T')[0];
    },

    // 记录访问
    trackVisit() {
        const visitorId = this.getVisitorId();
        const today = this.getTodayDate();
        const stats = this.getStats();

        // 检查是否是新访客（基于最后访问时间）
        const lastVisit = stats.lastVisit;
        const isNewVisitor = !lastVisit || lastVisit !== today;

        // 更新总PV
        stats.totalViews++;

        // 更新今日PV
        if (!stats.dailyViews[today]) {
            stats.dailyViews[today] = 0;
        }
        stats.dailyViews[today]++;

        // 如果是新访客（今天第一次访问）
        if (isNewVisitor) {
            // 更新总UV
            stats.totalVisitors++;

            // 更新今日UV
            if (!stats.dailyVisitors[today]) {
                stats.dailyVisitors[today] = 0;
            }
            stats.dailyVisitors[today]++;
        }

        // 更新最后访问时间
        stats.lastVisit = today;

        this.saveStats(stats);
        return stats;
    },

    // 获取显示的统计信息
    getDisplayStats() {
        const stats = this.getStats();
        const today = this.getTodayDate();

        return {
            totalUV: stats.totalVisitors,
            totalPV: stats.totalViews,
            todayUV: stats.dailyVisitors[today] || 0,
            todayPV: stats.dailyViews[today] || 0
        };
    }
};

// ======================== 数据缓存 ========================
const DataCache = {
    digital: null,
    repos: null,
    tools: null,
    courses: null,
    quants: null,

    async loadDigital() {
        if (this.digital) return this.digital;
        const response = await fetch('data/digital.json');
        this.digital = await response.json();
        return this.digital;
    },

    async loadRepos() {
        if (this.repos) return this.repos;
        const response = await fetch('data/repos.json');
        this.repos = await response.json();
        return this.repos;
    },

    async loadTools() {
        if (this.tools) return this.tools;
        const response = await fetch('data/tools.json');
        const data = await response.json();
        this.tools = data.categories;
        return this.tools;
    },

    async loadCourses() {
        if (this.courses) return this.courses;
        const response = await fetch('data/courses.json');
        this.courses = await response.json();
        return this.courses;
    },

    async loadQuants() {
        if (this.quants) return this.quants;
        const response = await fetch('data/quant.json');
        this.quants = await response.json();
        return this.quants;
    }
};

// ======================== 渲染函数 ========================
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>加载数据中...</p>
        </div>
    `;
}

function hideLoading(containerId) {
    const loading = document.querySelector(`#${containerId} .loading-state`);
    if (loading) loading.remove();
}

async function renderDigitalList() {
    const digitalList = document.getElementById('digital-list');
    showLoading('digital-list');

    try {
        const articles = await DataCache.loadDigital();
        hideLoading('digital-list');
        digitalList.innerHTML = '';

        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'digital-card';
            card.innerHTML = `
                <div class="digital-title">
                    <a href="${article.url}" target="_blank">${article.title}</a>
                </div>
                ${article.subtitle ? `<div class="digital-subtitle">${article.subtitle}</div>` : ''}
                <div class="digital-url">${article.url}</div>
            `;
            digitalList.appendChild(card);
        });

        document.getElementById('digital-count').textContent = articles.length;
    } catch (error) {
        digitalList.innerHTML = `
            <div class="empty-state">
                <h3>数据加载失败</h3>
                <p>请检查网络连接或刷新页面重试</p>
            </div>
        `;
    }
}

async function renderRepoList() {
    const repoList = document.getElementById('repo-list');
    showLoading('repo-list');

    try {
        const repos = await DataCache.loadRepos();
        hideLoading('repo-list');
        repoList.innerHTML = '';

        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.innerHTML = `
                <div class="repo-name">
                    <a href="${repo['repository url']}" target="_blank">${repo['repository name']}</a>
                </div>
                <div class="repo-desc">${repo['repository 简介']}</div>
                <div class="repo-url">${repo['repository url']}</div>
            `;
            repoList.appendChild(card);
        });

        document.getElementById('repo-count').textContent = repos.length;
    } catch (error) {
        repoList.innerHTML = `
            <div class="empty-state">
                <h3>数据加载失败</h3>
                <p>请检查网络连接或刷新页面重试</p>
            </div>
        `;
    }
}

async function renderToolList(category = 'all') {
    const toolList = document.getElementById('tool-list');
    showLoading('tool-list');

    try {
        const toolsData = await DataCache.loadTools();
        hideLoading('tool-list');
        toolList.innerHTML = '';

        let tools = [];
        if (category === 'all') {
            Object.values(toolsData).forEach(categoryTools => {
                tools = tools.concat(categoryTools);
            });
        } else {
            tools = toolsData[category] || [];
        }

        if (tools.length > 0) {
            document.getElementById('empty-state').style.display = 'none';

            tools.forEach(tool => {
                const card = document.createElement('div');
                card.className = 'tool-card';
                card.innerHTML = `
                    <div class="tool-category">${tool.category || category}</div>
                    <div class="tool-name">
                        <a href="${tool.githubUrl !== '无开源仓库（商业API服务）' ? tool.githubUrl : '#'}" target="_blank">${tool.name}</a>
                    </div>
                    <div class="tool-info">
                        <div class="tool-info-title">核心定位</div>
                        <div class="tool-info-content">${tool.corePosition}</div>
                    </div>
                    <div class="tool-info">
                        <div class="tool-info-title">核心功能</div>
                        <div class="tool-info-content">${tool.coreFunction}</div>
                    </div>
                    <div class="tool-info">
                        <div class="tool-info-title">适用场景</div>
                        <div class="tool-info-content">${tool.applicableScene}</div>
                    </div>
                    <div class="tool-info">
                        <div class="tool-info-title">技术优势</div>
                        <div class="tool-info-content">${tool.technicalAdvantage}</div>
                    </div>
                    <div class="tool-url">${tool.githubUrl}</div>
                `;
                toolList.appendChild(card);
            });
        } else {
            document.getElementById('empty-state').style.display = 'block';
        }

        // 更新统计
        const allTools = Object.values(toolsData).flat();
        const categoryCount = Object.keys(toolsData).length;
        document.getElementById('tool-count').textContent = allTools.length;
        document.getElementById('category-count').textContent = categoryCount;
        document.getElementById('current-category').textContent = category === 'all' ? '全部工具' : category;
        document.getElementById('current-count').textContent = tools.length;
    } catch (error) {
        toolList.innerHTML = `
            <div class="empty-state">
                <h3>数据加载失败</h3>
                <p>请检查网络连接或刷新页面重试</p>
            </div>
        `;
    }
}

async function renderCourseList() {
    const courseList = document.getElementById('course-list');
    showLoading('course-list');

    try {
        const courses = await DataCache.loadCourses();
        hideLoading('course-list');
        courseList.innerHTML = '';

        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <div class="course-name">
                    <a href="${course['course url']}" target="_blank">${course['course name']}</a>
                </div>
                <div class="course-desc">${course['course 简介']}</div>
                <div class="course-url">${course['course url']}</div>
            `;
            courseList.appendChild(card);
        });

        document.getElementById('course-count').textContent = courses.length;
    } catch (error) {
        courseList.innerHTML = `
            <div class="empty-state">
                <h3>数据加载失败</h3>
                <p>请检查网络连接或刷新页面重试</p>
            </div>
        `;
    }
}

async function renderQuantList() {
    const quantList = document.getElementById('quant-list');
    showLoading('quant-list');

    try {
        const quants = await DataCache.loadQuants();
        hideLoading('quant-list');
        quantList.innerHTML = '';

        quants.forEach(quant => {
            const card = document.createElement('div');
            card.className = 'quant-card';
            card.innerHTML = `
                <div class="quant-name">
                    <a href="${quant.url}" target="_blank">${quant.name}</a>
                </div>
                <div class="quant-desc">${quant.description}</div>
                <div class="quant-url">${quant.url}</div>
                <div class="quant-tip">提示：由于是 HTTP 地址，建议在浏览器无痕模式下打开</div>
            `;
            quantList.appendChild(card);
        });

        document.getElementById('quant-count').textContent = quants.length;
    } catch (error) {
        quantList.innerHTML = `
            <div class="empty-state">
                <h3>数据加载失败</h3>
                <p>请检查网络连接或刷新页面重试</p>
            </div>
        `;
    }
}

// ======================== 模块切换 ========================
function initModuleSwitch() {
    const moduleBtns = document.querySelectorAll('.module-btn');
    const modules = document.querySelectorAll('.module');

    moduleBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            moduleBtns.forEach(b => b.classList.remove('active'));
            modules.forEach(m => m.classList.remove('active'));

            btn.classList.add('active');
            const moduleId = `${btn.dataset.module}-module`;
            document.getElementById(moduleId).classList.add('active');

            // 显示/隐藏工具分类统计
            if (btn.dataset.module === 'tool') {
                document.getElementById('current-tool-stats').style.display = 'block';
                // 首次切换到工具模块时加载数据
                if (document.getElementById('tool-list').children.length === 0) {
                    await renderToolList();
                }
            } else {
                document.getElementById('current-tool-stats').style.display = 'none';
            }

            // 按需加载各模块数据
            if (btn.dataset.module === 'digital' && document.getElementById('digital-list').children.length === 0) {
                await renderDigitalList();
            } else if (btn.dataset.module === 'repo' && document.getElementById('repo-list').children.length === 0) {
                await renderRepoList();
            } else if (btn.dataset.module === 'course' && document.getElementById('course-list').children.length === 0) {
                await renderCourseList();
            } else if (btn.dataset.module === 'quant' && document.getElementById('quant-list').children.length === 0) {
                await renderQuantList();
            }
        });
    });
}

// ======================== 工具分类切换 ========================
function initCategorySwitch() {
    const categoryBtns = document.querySelectorAll('.category-btn');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderToolList(btn.dataset.category);
        });
    });
}

// ======================== 页面初始化 ========================
window.addEventListener('DOMContentLoaded', async () => {
    initModuleSwitch();
    initCategorySwitch();

    // 统计UV/PV（仅在后台记录，不显示在页面上）
    StatsTracker.trackVisit();

    // 默认加载数字化转型模块（首屏）
    await renderDigitalList();
});
