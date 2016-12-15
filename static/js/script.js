$(document).ready(function () {
    $(".multi-search").hide();
    $('.search_button').on('click', function () {
        var searchChoice = $(".chosen-choices li.search-choice").length;

        var multiSearchText = '';
        $(".chosen-choices li.search-choice").each(function(){
            multiSearchText += '<input type="text" placeholder="'+$(this).find('span').text()+'" class="form-control">';
            console.log($(this).find('span').text());

        });

        $(".multi-search .inps").html(multiSearchText);
        if (searchChoice)
            $(".multi-search").show();
        else
            $(".multi-search").hide();
    });

    $(document).on('click',".search-choice .search-choice-close", function () {
       alert('hh');
    });
/*
            var mandal =['Number','Name','Mandal/Town Committee Member','Voters',
            'Total number of Village/Ward','Names of villages/Ward',
            'Polling Booths','Constituency','Total Population',
            'Total number of voters','Past 2 Elections Data',
            'Cast Metrics','Rural/Urban/Semi','Voting Influencers'];
            var constituency = ['Number','Name','Constituency Incharge','Voters',
                                'Total number of Mandals/Towns','Mandal/Town details',
                                'Village/Ward','Polling Booths','Total Population',
                                'Total number of voters','Past 2 Elections Data',
                                'Cast Metrics','Rural/Urban/Semi','Voting Influencers'];
            var polling = ['Number','Name','Booth Committee Member',
                            'Voters','Village or Ward','Mandal or Town',
                            'Constituency','Total Population',
                            'Total number of voters','Past 2 Elections Data',
                            'Cast Metrics','Rural/Urban/Semi','Voting Influencers'];
            //$('.chosen-select').chosen();
            $(".mandal span").click(function(){
                $('body').addClass('red');
                $('body').removeClass('black');
                $(".multi-search,.list-tiems,.data-table").hide();
                $('.chosen-select').empty();
                $("#search_txt").html('SEARCH MANDAL');
                var opt = '';
                for(var i=0; i<mandal.length; i++){
                    opt+='<option>'+mandal[i]+'</option>';

                }
                $('.chosen-select').append(opt);
                $(".search_criteria").show();
                //$(".chosen-select").hide();
                $('.chosen-select').chosen()
                $('.chosen-select').trigger("chosen:updated");
                

            });
            
            $(".constituency span").click(function(){
                $('body').addClass('black');
                $('body').removeClass('red');
                $(".multi-search,.list-tiems,.data-table").hide();
                $('.chosen-select').empty();
                $("#search_txt").html('SEARCH CONSTITUENCY');
                var opt = '';
                for(var i=0; i<constituency.length; i++){
                    opt+='<option>'+constituency[i]+'</option>';

                }
                $('.chosen-select').append(opt);
                $(".search_criteria").show();
                //$(".chosen-select").hide();
                $('.chosen-select').chosen()
                $('.chosen-select').trigger("chosen:updated");
            });
            
            $(".polling span").click(function(){
                $('body').removeClass('black');
                $('body').removeClass('red');
                $(".multi-search,.list-tiems,.data-table").hide();
                $("#search_txt").html('SEARCH POLLING BOOTHS');
                $('.chosen-select').empty();
                var opt = '';
                for(var i=0; i<polling.length; i++){
                    opt+='<option>'+polling[i]+'</option>';

                }
                $('.chosen-select').append(opt);
                
                $(".search_criteria").show();
                //$(".chosen-select").show();
                $('.chosen-select').chosen();
                $('.chosen-select').trigger("chosen:updated");
            });
            $(".submit_search").click(function(){
                $(".list-tiems,.data-table").show();
            });*/


});